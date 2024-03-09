export function getHelloMessage(): string {
    let message = "";
    const hour = new Date().getHours();
    if (hour < 9) message = "早上好";
    else if (hour < 12) message = "中午好";
    else if (hour < 18) message = "下午好";
    else message = "晚上好";
    return message;
}
