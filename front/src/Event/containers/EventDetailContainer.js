import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {Col, Layout, List, Row, Typography} from "antd";
import moment from 'moment';

const {Title} = Typography;

const EventDetail = (props) => {

    const [event, setEvent] = useState({});

    useEffect(() => {
        const eventID = props.match.params.eventID;
        axios.get(`api/movie/events/${eventID}/`)
            .then(res => {
                setEvent(res.data);
            })
    }, []);


    const start_date = moment(event.start_date).format("MMMM Do YYYY");
    const end_date = moment(event.end_date).format("MMMM Do YYYY");
    return (
        <Layout style={{paddingTop: '40px'}}>
            <div style={{
                background: `url(${event.poster})`,
                position: 'absolute',
                filter: 'blur(40px)',
                top: 0,
                bottom: 0,
                left: 0,
                right: 0,
                zIndex: 0,
                overflow: 'hidden',
                height: '400px',
            }}>
                <div style={{
                    position: 'relative',
                    overflow: 'hidden',
                    background: 'hsla(0, 10%, 60%, 0.5)',
                    height: '400px',
                    zIndex: 1,
                }}/>
            </div>
            <div style={{width: '100%', margin: '5% auto'}}>
                <Row style={{margin: '0 auto', paddingTop: '1%', paddingBottom: '5%'}}>
                    <Col xxl={{span: 16, offset: 5}} xl={{span: 14, offset: 5}} lg={{span: 18, offset: 3}}
                         style={{
                             backgroundColor: '#fff',
                             boxShadow: '0 1px 3px rgba(26,26,26,.1)',
                             borderRadius: '5px',
                         }}>
                        <Row style={{
                            borderColor: 'transparent transparent #CFCFCF transparent',
                            borderStyle: 'solid',
                            borderWidth: '1px',
                        }}
                        >
                            <Col span={16} style={{
                                padding: '20px 20px',
                                borderColor: 'transparent #CFCFCF transparent transparent',
                                borderStyle: 'solid',
                                borderWidth: '1px',
                                height: '100%'
                            }}>
                                <Title level={4} style={{fontSize: '45px', color: '#6E6E6E'}}>{event.title}</Title>
                            </Col>
                            <Col span={8} style={{padding: '20px 20px',}}>
                                <List>
                                    <List.Item>
                                        <Title level={4}
                                               style={{fontSize: '20px', color: '#6E6E6E'}}>{start_date}</Title>
                                    </List.Item>
                                </List>
                            </Col>
                        </Row>
                        <Row style={{
                            borderColor: 'transparent transparent #CFCFCF transparent',
                            borderStyle: 'solid',
                            borderWidth: '1px',
                        }}
                        >
                            <Col span={12}>
                                <img alt={'event poster'} src={event.poster} width={'100%'}/>
                            </Col>
                            <Col span={12} style={{padding: '20px 20px'}}>
                                <List bordered={false} size="small" split={false}>
                                    <List.Item>
                                        <Title level={1}
                                               style={{fontSize: '20px', color: '#6E6E6E'}}>Date and Time</Title>
                                    </List.Item>
                                    <List.Item>
                                        <p style={{
                                            fontSize: '15px',
                                            color: '#6E6E6E'
                                        }}>Start: {start_date} <br/>
                                            End: {end_date}
                                        </p>
                                    </List.Item>
                                </List>
                                <List bordered={false} size="small" split={false}>
                                    <List.Item>
                                        <Title level={1}
                                               style={{fontSize: '20px', color: '#6E6E6E'}}>Location</Title>
                                    </List.Item>
                                    <List.Item>
                                        <p style={{
                                            fontSize: '15px',
                                            color: '#6E6E6E'
                                        }}>{event.location}</p>
                                    </List.Item>
                                </List>
                            </Col>
                        </Row>
                        <Row style={{padding: '20px 20px', paddingBottom: '10%'}}>
                            <Title level={1} style={{fontSize: '20px', color: '#6E6E6E'}}>About</Title>
                            <p style={{whiteSpace: 'pre-wrap'}}>{event.content}</p>
                        </Row>
                    </Col>
                </Row>
            </div>
        </Layout>
    )
};

export default EventDetail