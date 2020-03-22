import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {BackTop, Col, Layout, Row, List, Icon} from "antd";
import EventList from "../components/EventList";
import {Link} from "react-router-dom";

const IconFont = Icon.createFromIconfontCN({
    scriptUrl: '//at.alicdn.com/t/font_1621723_un1kxztz8c.js'
});

let page = 1;
const pagesize = 5;
const EventListContainer = () => {

    const [events, setEvents] = useState([]);
    const [count, setCount] = useState(0);
    const [loading, setLoading] = useState(false);


    useEffect(() => {
        setLoading(true);
        axios.get("api/movie/events/", {
            params: {
                page: page,
                page_size: pagesize,
            }

        }).then(res => {
                setEvents(res.data.results);
                setCount(res.data.count);
                setLoading(false);
            }
        )
    }, []);

    const handleEvent = async page => {
        setLoading(true);
        await axios.get("api/movie/events/", {
            params: {
                page: page,
                page_size: pagesize
            }
        }).then(res => {
            let temp = events;
            let i = (page - 1) * pagesize;
            for (let index = 0; index < res.data.results.length; index++) {
                temp[i] = res.data.results[index];
                i++;
            }
            setEvents(temp);
            setLoading(false);
        }).catch(error => {
            console.log(error);
        });
    };

    return (
        <Layout style={{margin: '40px 0'}}>
            <BackTop/>
            <Row gutter={[{sm: 0, md: 24}, {xs: 16, sm: 16, md: 0}]}>
                <Col xxl={{span: 14, offset: 3}}
                     xl={{span: 15, offset: 2}}
                     lg={{span: 15, offset: 2}}
                     md={{span: 15, offset: 1}}
                     sm={{span: 22, offset: 1}}
                     xs={{span: 22, offset: 1}}
                     style={{
                         backgroundColor: '#fff',
                         boxShadow: '0 1px 3px rgba(26,26,26,.1)',
                         borderRadius: '1px',
                     }}>
                    <List
                        loading={loading}
                        itemLayout="vertical"
                        size="large"
                        pagination={{
                            onChange: handleEvent,
                            total: count,
                            pageSize: pagesize,
                        }}
                        dataSource={events}
                        renderItem={item => (
                            <EventList item={item} key={"events-list"}/>
                        )}
                    />
                </Col>
                <Col xxl={{span: 4, offset: 0}}
                     xl={{span: 4, offset: 0}}
                     lg={{span: 5, offset: 0}}
                     md={{span: 6, offset: 0}}
                     sm={{span: 22, offset: 1}}
                     xs={{span: 22, offset: 1}}
                >
                    <div style={{
                        background: '#fff',
                        borderRadius: '1px',
                        boxShadow: '0 1px 3px rgba(26,26,26,.1)',
                    }}>
                        <div>
                            <Link
                                to={(window.localStorage.getItem('token') !== null) ? '/create_article' : '/login'}>
                                <IconFont type='iconiconfaqihuodong' style={{fontSize: '30px'}}/>
                            </Link>
                        </div>
                    </div>
                </Col>
            </Row>
        </Layout>
    )
}

export default EventListContainer