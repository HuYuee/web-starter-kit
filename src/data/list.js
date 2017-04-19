Mock.mock('/market/product/getByStatus/3',{
  "status" : 1,
  "data" : [ {
    "isvName" : "未指定应用提供商名称",
    "productId" : "4130cda6-6c58-41a2-915a-19533478e4ea",
    "isvId" : "wukcyy0w",
    "productCode" : "taomkPay",
    "productName" : "支付宝By taomk",
    "productType" : "财务",
    "deliverMode" : "SAAS",
    "createTime" : "2017-01-17 19:22:20.0",
    "brief" : "支付宝私人定制版By taomk",
    "snapshot" : "产品截图URL",
    "qualification" : "产品资质URL",
    "clientCase" : "客户案例URL",
    "guide" : "taomk出品，必属精品",
    "aftermarketSupport" : "一经售出，概不退换，后果自负",
    "agreement" : "GPL",
    "logo" : "产品logo",
    "versionNum" : "0.0.1",
    "introduction" : "各种逆天功能",
    "detail" : "你值得拥有的一款酷炫APP",
    "usableOs" : "iOS/MacOS",
    "mainpage" : "www.taomk-app.com",
    "status" : "3"
  }, {
    "isvName" : "未指定应用提供商名称",
    "productId" : "5",
    "isvId" : "",
    "productCode" : "BUSContacts",
    "productName" : "企业通讯录",
    "productType" : "未指定",
    "deliverMode" : "SAAS",
    "createTime" : "2017-01-17 14:13:54.0",
    "brief" : "主要是面向全员随时随时查询企业相关人员的联系方式以及相关信息；并快速建立通话。",
    "snapshot" : "",
    "qualification" : "",
    "clientCase" : "",
    "guide" : "",
    "aftermarketSupport" : "",
    "agreement" : "",
    "logo" : "",
    "versionNum" : "",
    "introduction" : "",
    "detail" : "",
    "usableOs" : "未指定",
    "mainpage" : "",
    "status" : "3"
  }, {
    "isvName" : "未指定应用提供商名称",
    "productId" : "61aad04f-b83e-4190-a095-df0c0b7d2232",
    "isvId" : "wukcyy0w",
    "productCode" : "微博taomk",
    "productName" : "微博By taomk",
    "productType" : "社交协同",
    "deliverMode" : "SAAS",
    "createTime" : "2017-01-17 19:23:13.0",
    "brief" : "微博私人定制版By taomk",
    "snapshot" : "产品截图URL",
    "qualification" : "产品资质URL",
    "clientCase" : "客户案例URL",
    "guide" : "taomk出品，必属精品",
    "aftermarketSupport" : "一经售出，概不退换，后果自负",
    "agreement" : "GPL",
    "logo" : "产品logo",
    "versionNum" : "0.0.1",
    "introduction" : "各种逆天功能",
    "detail" : "你值得拥有的一款酷炫APP",
    "usableOs" : "iOS/MacOS",
    "mainpage" : "www.taomk-app.com",
    "status" : "3"
  }, {
    "isvName" : "未指定应用提供商名称",
    "productId" : "c5941d2f-8f1d-4e36-8891-88a1d240f633",
    "isvId" : "wukcyy0w",
    "productCode" : "wechat-taomk",
    "productName" : "微信By taomk",
    "productType" : "社交协同",
    "deliverMode" : "SAAS",
    "createTime" : "2017-01-17 18:25:11.0",
    "brief" : "微信私人定制版By taomk",
    "snapshot" : "产品截图URL",
    "qualification" : "产品资质URL",
    "clientCase" : "客户案例URL",
    "guide" : "taomk出品，必属精品",
    "aftermarketSupport" : "一经售出，概不退换，后果自负",
    "agreement" : "GPL",
    "logo" : "产品logo",
    "versionNum" : "0.0.1",
    "introduction" : "各种逆天功能",
    "detail" : "你值得拥有的一款酷炫APP",
    "usableOs" : "iOS/MacOS",
    "mainpage" : "www.taomk-app.com",
    "status" : "3"
  } ]
});

// 4130cda6-6c58-41a2-915a-19533478e4ea
// 5
// 52b692bd-2973-478f-aae4-695d6be52d0c此数据暂无
// 61aad04f-b83e-4190-a095-df0c0b7d2232
// c5941d2f-8f1d-4e36-8891-88a1d240f633
// /market/product/saleInfo/

Mock.mock('/market/product/saleInfo/4130cda6-6c58-41a2-915a-19533478e4ea',{
  "status" : 1,
  "data" : {
    "productName" : "支付宝By taomk",
    "specification" : [ {
      "specificationId" : "1484643227",
      "productId" : "4130cda6-6c58-41a2-915a-19533478e4ea",
      "specificationName" : "初级版",
      "specificationLease" : "1/12/24",
      "price" : 100.0
    }, {
      "specificationId" : "1484643228",
      "productId" : "4130cda6-6c58-41a2-915a-19533478e4ea",
      "specificationName" : "高级版",
      "specificationLease" : "6/12/24",
      "price" : 150.0
    }, {
      "specificationId" : "1484643229",
      "productId" : "4130cda6-6c58-41a2-915a-19533478e4ea",
      "specificationName" : "精英版",
      "specificationLease" : "12/24/36",
      "price" : 180.0
    }, {
      "specificationId" : "1484643230",
      "productId" : "4130cda6-6c58-41a2-915a-19533478e4ea",
      "specificationName" : "测试版",
      "specificationLease" : "1/3",
      "price" : 1.0
    }, {
      "specificationId" : "1484643231",
      "productId" : "4130cda6-6c58-41a2-915a-19533478e4ea",
      "specificationName" : "精简版",
      "specificationLease" : "1/2/3",
      "price" : 0.01
    } ]
  }
})

Mock.mock('/market/product/saleInfo/5',{
  "status" : 1,
  "data" : {
    "productName" : "企业通讯录",
    "specification" : [ {
      "specificationId" : "1484641714",
      "productId" : "5",
      "specificationName" : "初级版",
      "specificationLease" : "1/12/24",
      "price" : 100.0
    }, {
      "specificationId" : "1484641730",
      "productId" : "5",
      "specificationName" : "高级版",
      "specificationLease" : "6/12/24",
      "price" : 150.0
    }, {
      "specificationId" : "1484641762",
      "productId" : "5",
      "specificationName" : "精英版",
      "specificationLease" : "12/24/36",
      "price" : 180.0
    }, {
      "specificationId" : "1484641765",
      "productId" : "5",
      "specificationName" : "测试版",
      "specificationLease" : "1/3",
      "price" : 1.0
    }, {
      "specificationId" : "1484641788",
      "productId" : "5",
      "specificationName" : "精简版",
      "specificationLease" : "1/2/3",
      "price" : 0.01
    } ]
  }
})

Mock.mock('/market/product/saleInfo/61aad04f-b83e-4190-a095-df0c0b7d2232',{
  "status" : 1,
  "data" : {
    "productName" : "微博By taomk",
    "specification" : [ {
      "specificationId" : "1484643232",
      "productId" : "61aad04f-b83e-4190-a095-df0c0b7d2232",
      "specificationName" : "初级版",
      "specificationLease" : "1/12/24",
      "price" : 100.0
    }, {
      "specificationId" : "1484643233",
      "productId" : "61aad04f-b83e-4190-a095-df0c0b7d2232",
      "specificationName" : "高级版",
      "specificationLease" : "6/12/24",
      "price" : 150.0
    }, {
      "specificationId" : "1484643234",
      "productId" : "61aad04f-b83e-4190-a095-df0c0b7d2232",
      "specificationName" : "精英版",
      "specificationLease" : "12/24/36",
      "price" : 180.0
    }, {
      "specificationId" : "1484643235",
      "productId" : "61aad04f-b83e-4190-a095-df0c0b7d2232",
      "specificationName" : "测试版",
      "specificationLease" : "1/3",
      "price" : 1.0
    }, {
      "specificationId" : "1484643236",
      "productId" : "61aad04f-b83e-4190-a095-df0c0b7d2232",
      "specificationName" : "精简版",
      "specificationLease" : "1/2/3",
      "price" : 0.01
    } ]
  }
})

Mock.mock('/market/product/saleInfo/c5941d2f-8f1d-4e36-8891-88a1d240f633',{
  "status" : 1,
  "data" : {
    "productName" : "微信By taomk",
    "specification" : [ {
      "specificationId" : "1484643247",
      "productId" : "c5941d2f-8f1d-4e36-8891-88a1d240f633",
      "specificationName" : "初级版",
      "specificationLease" : "1/12/24",
      "price" : 100.0
    }, {
      "specificationId" : "1484643248",
      "productId" : "c5941d2f-8f1d-4e36-8891-88a1d240f633",
      "specificationName" : "高级版",
      "specificationLease" : "6/12/24",
      "price" : 150.0
    }, {
      "specificationId" : "1484643249",
      "productId" : "c5941d2f-8f1d-4e36-8891-88a1d240f633",
      "specificationName" : "精英版",
      "specificationLease" : "12/24/36",
      "price" : 180.0
    }, {
      "specificationId" : "1484643250",
      "productId" : "c5941d2f-8f1d-4e36-8891-88a1d240f633",
      "specificationName" : "测试版",
      "specificationLease" : "1/3",
      "price" : 1.0
    }, {
      "specificationId" : "1484643251",
      "productId" : "c5941d2f-8f1d-4e36-8891-88a1d240f633",
      "specificationName" : "精简版",
      "specificationLease" : "1/2/3",
      "price" : 0.01
    } ]
  }
})
