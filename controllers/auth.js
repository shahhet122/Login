const { User } = require('../models');
const hashPassword = require('../utils/hashPassword');
const comparePassword = require('../utils/comparePassword');
const generateToken = require('../utils/generateToken');
const generateCode = require('../utils/generateCode');
const sendEmail = require('../utils/sendEmail');

const signup = async (req, res, next) => {
    try {
        const { name, email, password, role } = req.body;

        const isEmailExist = await User.findOne({ email });
        if (isEmailExist) {
            res.status(400)
            throw new Error('Email already exists');
        }
        const hashedPassword = await hashPassword(password);


        const newUser = new User({ name, email, password: hashedPassword, role });
        await newUser.save();
        res.status(201).json({ code: 201, status: true, message: 'User created successfully' });
    } catch (error) {
        next(error);
    }
};

const signin = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        // console.log(user);
        if (!user) {
            res.code = 401;
            throw new Error('Invalid creds');
        }
        const match = await comparePassword(password, user.password);
        // console.log(match);
        if (!match) {
            res.code = 401;
            throw new Error('Invalid password');
        }

        const token = generateToken(user);
        res.status(200).json({
            code: 200, status: true, message: 'User logged in successfully', data: { token }
        });
    }

    catch (error) {
        next(error);
    }
};

const verifyCode = async (req, res, next) => {
    try {
        const { email } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            res.code = 404;
            throw new Error('User not found');
        }
        if (user.isVerified) {
            res.code = 400;
            throw new Error('User already verified');
        }
        const code = generateCode(6);
        user.verificationCode = code;
        await user.save();
        ;
        console.log(email, code);

        // send email with code
        await sendEmail({
            name: user.name,
            emailTo: user.email,
            subject: 'Verification Code',
            code,
            content: 'Your verification code is'
        });

        res.status(200).json({ code: 200, status: true, message: 'Code sent successfully' });


    }
    catch (error) {
        next(error);
    }
};

const verifyUser = async (req, res, next) => {
    try {
        const { email, code } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            res.code = 404;
            throw new Error('User not found');
        }
        if (user.verificationCode !== code) {
            res.code = 400;
            throw new Error('Invalid code');
        }
        user.isVerified = true;
        user.verificationCode = null;
        await user.save();

        res.status(200).json({ code: 200, status: true, message: 'User verified successfully' });
    } catch (error) {
        next(error);
    }
}

const forgotPassword = async (req, res, next) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            res.code = 404;
            throw new Error('User not found');
        }
        const code = generateCode(6);
        user.forgotPasswordCode = code;
        await user.save();

        await sendEmail({
            name: user.name,
            emailTo: user.email,
            subject: 'Forgot Password Code',
            code,
            content: 'Your forgot password code is'
        });
        res.status(200).json({ code: 200, status: true, message: 'Code sent successfully' });
    } catch (error) {
        next(error);
    }
}

const resetPassword = async (req, res, next) => {
    try {
        const { email, code, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            res.code = 404;
            throw new Error('User not found');
        }
        if (user.forgotPasswordCode !== code) {
            res.code = 400;
            throw new Error('Invalid code');
        }
        const hashedPassword = await hashPassword(password);
        user.password = hashedPassword;
        user.forgotPasswordCode = null;
        await user.save();
        res.status(200).json({ code: 200, status: true, message: 'Password reset successfully' });

    } catch (error) {
        next(error);
    }

}

const changePassword = async (req, res, next) => {
    try {
        const { oldPassword, newPassword } = req.body;
        const { _id } = req.user;

        const user = await User.findById(_id);
        if (!user) {
            res.code = 404;
            throw new Error("User not found")
        }
        const match = await comparePassword(oldPassword, user.password);
        if (!match) {
            res.code = 400;
            throw new Error("Old password doestn't match")
        }
        if (oldPassword === newPassword) {
            res.code = 400;
            throw new Error("You are providing old password")
        }
        const hashedPassword = await hashPassword(newPassword);
        user.password = hashedPassword;
        await user.save();
        res.status(200).json({ code: 200, status: true, message: "Password changed successfully" })

    } catch (error) {
        next(error)
    }
}

const updateProfile = async (req, res, next) => {
    try {
        const { _id } = req.user;
        const { name, email } = req.body;

        const user = await User.findById(_id).select('-password -forgotPasswordCode');;
        if (!user) {
            res.code = 404;
            throw new Error("User not found")
        }
        if (email) {
            const isUserExist = await User.findOne({ email });
            if (isUserExist && isUserExist.email === email && String(user._id) !== String(isUserExist._id)) {

                res.code = 400;
                throw new Error("Email already exists")
            }
        }
        user.name = name ? name : user.name;
        user.email = email ? email : user.email;

        if (email) {
            user.isVerified = false;
        }
        await user.save();
        res.status(200).json({ code: 200, status: true, message: "Profile updated successfully", data: { user } })
    }
    catch (error) {
        next(error)
    }
}

module.exports = { signup, signin, verifyCode, verifyUser, forgotPassword, resetPassword, changePassword, updateProfile };