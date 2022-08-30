import Head from 'next/head'
import { Table, Layout } from 'antd';
import { Content } from 'antd/lib/layout/layout';
import { useEffect, useState } from 'react';

const columns = [
    {
        title: '商品',
        dataIndex: 'name'

    },
    {
        title: '价格',
        dataIndex: 'price'
    }
];


export default function Gold() {
    const [data, setData] = useState();
    const fetchData = () => {
        fetch('/api/getdata')
            .then((res) => res.json())
            .then(({ results }) => {
                setData(results)
            })
    }
    useEffect(() => {
        setInterval(() => { fetchData(); }, 20000);
        fetchData();
    }, [])
    return (
        <Layout>
            <Head>
                <title>
                    伦敦金价格
                </title>
            </Head>
            <Content>
                <Table columns={columns} dataSource={data} size='small' pagination={false} rowKey={(ret) => ret.key} />
            </Content>
        </Layout>
    );
}