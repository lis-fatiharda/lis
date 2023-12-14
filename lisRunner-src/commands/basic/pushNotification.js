export default function pushNotification() {

    Notification.requestPermission().then((perm) => {
        alert()
        if (perm === "granted") {
            const myNotification = new Notification("Example Notification", {
                body: "This is more text",
            });
        }
    });
}
