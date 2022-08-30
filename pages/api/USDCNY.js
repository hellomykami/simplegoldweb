const request = require('request')

const GetData = async function () {
    return new Promise((resolve, reject) => {
        var options = {
            'method': 'GET',
            'url': 'https://hq.sinajs.cn/list=USDCNY',
            'ecoding': null,
            'headers': {
                'referer': 'https://finance.sina.com.cn',
                'Content-Type': 'application/javascript; charset=GB18030'
            }
        };
        request(options, function (error, response) {
            if (error) throw new Error(error);
            resolve(response.body)
        });
    })
}

export default function handler(req, res) {
    GetData().then((ret) => {
        const price = ret.match(/,[0-9.]{0,7},.{0,15}-/i)[0].slice(1, 7);
        res.status(200).json({ name: "在岸人民币", price: price })
    })
    //response.body.match(/,[0-9.]{0,7},.{0,15}-/i)[0].slice(1, 7)
}
