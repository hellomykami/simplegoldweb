var request = require('request');
export default function handler(req, res) {
    var options = {
        'method': 'GET',
        'url': 'https://hq.sinajs.cn/list=USDCNY,hf_XAU,nf_AU0',
        'headers': {
            'referer': 'https://finance.sina.com.cn'
        }
    };
    request(options, function (error, response, body) {
        if (error) throw new Error(error);
        const USDCNY = body.match(/USDCNY="[0-9:,.]*/)[0].slice(-7, -1)
        const hf_XAU = body.match(/hf_XAU="[0-9:,.]*/)[0].slice(8, 15)
        const nf_AU0 = body.match(/nf_AU0=".*/)[0].match(/,[0-9]{1,3}\.[0-9]{1,3}.*/)[0].slice(49, 56)
        const cal_AU = (hf_XAU * USDCNY / 31.1035).toFixed(3)
        res.status(200).json({
            results: [
                { name: '在岸人民币', price: USDCNY, key: 'USDCNY' },
                { name: '伦敦金', price: hf_XAU, key: 'hf_XAU' },
                { name: '黄金连续', price: nf_AU0, key: 'nf_au0' },
                { name: '黄金(伦敦金实时汇率)', price: cal_AU, key: 'cal_au' }
            ]
        })
    });

}