import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {BackTop, Col, Layout, Row, List} from "antd";
import EventList from "../components/EventList";
import EventFilter from "../components/EventFilter";
import SubMenu from "../../Home/components/SubMenu";

let page = 1;
const pagesize = 5;
const EventListContainer = () => {

    const [events, setEvents] = useState([]);
    const [count, setCount] = useState(0);
    const [loading, setLoading] = useState(false);

    const [deskWidth, setDeskWidth] = useState(0);

    const handleSize = () => {
        setDeskWidth(document.body.clientWidth);
    };

    useEffect(() => {
        window.addEventListener('resize', handleSize());
        return () => {
            window.removeEventListener('resize', handleSize());
        };
    });

    function getData(today, month, year) {
        axios.get("api/movie/events/", {
            params: {
                page: page,
                page_size: pagesize,
                start_date: today,
                month: month,
                year: year,
            },
        }).then(res => {
                setEvents(res.data.results);
                setCount(res.data.count);
                setLoading(false);
            }
        );
    }

    useEffect(() => {
        setLoading(true);
        getData()
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

    const handleDate = (today, month, year) => {
        getData(today, month, year)
    };

    return (
        <Layout style={{margin: (deskWidth > 700 ? '40px 0' : '0 0')}}>
            <Row type="flex" justify="start" gutter={[{xs: 0, sm: 0, md: 24}, 0]}>
                {
                    deskWidth > 700 ?
                        <Col xxl={{offset: 3}}
                             xl={{offset: 2}}
                             lg={{offset: 2}}
                             md={{offset: 1}}
                             sm={{offset: 1}}
                             xs={{offset: 1}}>
                            <EventFilter onDateFilter={handleDate}/>
                        </Col> :
                        <SubMenu menuKey="event"/>
                }
                <Col
                    xxl={{span: 14, offset: 0}}
                    xl={{span: 15, offset: 0}}
                    lg={{span: 15, offset: 0}}
                    md={{span: 15, offset: 0}}
                    sm={{span: 24, offset: 0}}
                    xs={{span: 24, offset: 0}}
                >
                    <div style={{
                        backgroundColor: '#fff',
                        boxShadow: '0 1px 3px rgba(26,26,26,.1)',
                        borderRadius: '1px',
                        padding: "10px 10px"
                    }}>
                        <List
                            loading={loading}
                            itemLayout="vertical"
                            size="large"
                            pagination={{
                                onChange: handleEvent,
                                total: count,
                                pageSize: pagesize,
                                style: {
                                    padding: "10px 10px"
                                }
                            }}
                            dataSource={events}
                            renderItem={item => (
                                <EventList item={item} key={"events-list"}/>
                            )}
                        />
                    </div>
                </Col>
            </Row>
            <BackTop/>
        </Layout>
    )
};

export default EventListContainer