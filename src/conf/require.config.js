var CLOUDPATH;
if(typeof(marketConfig) != "undefined") {
    var marketServer = marketConfig.marketServer || '';
    CLOUDPATH = marketServer + '/market/market/src/';
}else {
    CLOUDPATH =  '../';
}

require.config({
    baseUrl: CLOUDPATH,
    paths: {
        style: "vendor/require/css.min",
        jquery: "vendor/jquery/jquery.min",
        template: 'vendor/artTemplate/template',
        // velocity: "vendor/velocity/velocity.min",
		webuploader: 'vendor/uploader/js/webuploader',
        slick: "vendor/slick/js/slick.min",
        mock: 'vendor/mockjs/mock.min',
        solazy : 'vendor/solazy/jquery.solazy.min',
        data: 'data/data',
        util: "public/js/util",
        index: 'js/index/index',
        orderconfirm: 'js/order/orderconfirm',
        ordercomplete: 'js/order/ordercomplete',
		details: 'js/detail/details',
		shop: 'js/shop/shop',
		list: 'js/list/list',
		brand: 'js/brand/brand',
		settled:'js/settled/settled',
		PCASClass:'js/settled/PCASClass',
        artDialog:'vendor/aui-artDialog/js/dialog-min',
        protocol:'js/protocol/protocol',
        http_404:'js/http_404/http_404',
        http_500:'js/http_500/http_500'
    },
    shim: {
        'artDialog':{
          deps:['style!vendor/aui-artDialog/css/ui-dialog.css']
        },
        'util': {
            deps: ['slick', 'data',
                'style!vendor/purecss/grids.min.css',
                'style!vendor/animate/animate.min.css',
                'style!public/font/iconfont.css'
            ]
        },
        'slick': {
            deps: ["style!vendor/slick/css/slick.css",
                "style!vendor/slick/css/slick-theme.css"
            ]
        },
		'webuploader': {
			deps:[
				'style!vendor/uploader/css/webuploader.css'
			]
		},
        'data': {
            deps: ['mock']
        },
        'index': {
            deps: ['style!css/page/index.css']
        },
		'orderconfirm':{
			deps:[
				'style!css/page/orderconfirm.css',
				'style!css/widget/banner-carousel.css']
		},
        'ordercomplete':{
            deps:[
                'style!css/page/orderconfirm.css',
                'style!css/widget/banner-carousel.css']
        },
		'details':{
			deps: [
				'style!css/widget/banner-carousel.css',
				'style!css/page/details.css'
			]
		},
		'shop':{
			deps:[
				'style!css/page/shop.css'
			]
		},
		'list':{
			deps:[
				'style!css/page/list.css',
				'style!css/widget/product-info.css',
				'style!css/widget/pagination.css',
			]
		},
		'brand':{
			deps:[
				'style!vendor/slick/css/slick.css',
				'style!vendor/slick/css/slick-theme.css',
				'style!css/page/brand.css',
				'slick'
			]
		},
		'settled':{
			deps:[
				'style!css/page/index.css',
				'style!css/iconfont/iconfont.css',
				'style!css/page/settledstyle.css',
				'webuploader',
				'PCASClass'
			]
		},
		'protocol':{
			deps:[
                 'style!css/page/protocol.css'
			]
		},
        'http_404': {
            deps: [
                'style!css/page/http_404.css'
            ]
        },
        'http_500': {
            deps: [
                'style!css/page/http_500.css'
            ]
        }
    }
});
