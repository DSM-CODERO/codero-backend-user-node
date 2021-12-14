const { User } = require("../models");
const jwt = require("jsonwebtoken");


const sign_up = async (req, res) => {
    const { email, password, username } = req.body;

    try{
        await User.create({
            email,
            password,
            username
        });
        res.status(200).json({
            message: "회원가입 성공"
        });
    } catch(err) {
        res.status(409).json({
            message: "중복된 이메일 또는 닉네임"
        })
    }
};

const login = async(req, res) => {
    const { email, password } = req.body;
    const secretKey = req.app.get("jwt-secret");
    console.log(email, password, secretKey);

    try{
        const user = await User.findOne({
            where: {
                email : email
            },
        });

        if(user.password === password) {
            const accessToken = jwt.sign({
                user_id : user.user_id,
                email : user.email,
                username : user.username
            }, secretKey,
            {
                expiresIn: "24h",
            });
            res.status(200).json({
                message: "로그인 성공",
                accessToken,
            });
        } else {
            res.status(403).json({
                message: "로그인 실패"
            });
        }
    } catch(err) {
        console.error(err);
        res.status(400).json({
            message: "존재하지 않는 유저"
        });
    }
};

const viewMyPage = async(req, res) => {

    try{
        let username = req.decoded.username;
        let email = req.decoded.email;
        let Total = {username,email};

        res.status(200).json(
            Total
        );
        console.log(username, email);

    } catch(err) {
        res.status(400).json({
            message: "등록되지 않는 유저 정보"
        })
        console.error(err);
    };

}

module.exports = {
    sign_up,
    login,
    viewMyPage
};