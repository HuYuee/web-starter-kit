define(["mock"], function(Mock) {
    //模拟请求数据
    Mock.mock("/user/getInfo", {
        status: 1,
        data: {
            name: "xxx",
            title: "这是title"
        }
    });
});
