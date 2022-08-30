const request = require('request')

export default function handler(req, res) {
    var options = {
        'method': 'GET',
        'url': 'https://hq.sinajs.cn/list=hf_XAU',
        'headers': {
            'referer': 'https://finance.sina.com.cn'
        }
    };
    request(options, function (error, response) {
        if (error) throw new Error(error);
        res.status(200).json({ name: '伦敦金', price: response.body.match(/"[0-9.]*,/i)[0].slice(1, -1) })
    });
}
