define(["mock"], function(Mock) {
    // 首页&列表页 - 获取所有产品及价格信息
    Mock.mock("/user/getInfo", {
        status: 1,
        data: {
            name: "xxx",
            title: "这是title"
        }
    });
});
