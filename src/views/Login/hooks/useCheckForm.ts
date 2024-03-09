export default function () {
    const checkUsername = (rules: any, value: any, callback: any) => {
        if (value.length >= 4 && value.length <= 10) {
            callback();
        } else {
            callback(new Error("用户名长度应在 4 - 10 位"));
        }
    };
    const rules = {
        username: [
            {
                validator: checkUsername,
                //上面那个自定义和下面注释掉的效果一样，但自定义校验规则可以做更多的事情，例如两次密码输入的校验
                trigger: "change",
            },
            // {
            //     min: 4,
            //     max: 10,
            //     message: "用户名长度为 4 - 10个字符",
            //     trigger: "change",
            // },
        ],
        password: [
            {
                required: true,
                message: "密码不能为空",
                trigger: "blur",
            },
        ],
    };

    return { rules };
}
