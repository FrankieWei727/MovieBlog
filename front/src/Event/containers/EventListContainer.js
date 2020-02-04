import React from 'react';
import axios from 'axios';
import {BackTop, Col, Layout, Row, List, Icon} from "antd";
import EventList from "../components/EventList";
import {Link} from "react-router-dom";

const IconFont = Icon.createFromIconfontCN({
    scriptUrl: '//at.alicdn.com/t/font_1621723_786cv2t7k7y.js'
});
class EventListContainer extends React.Component {

    page = 1;
    state = {
        events: [],
        count: 0,
    };

    componentDidMount() {
        axios.get('api/movie/events/')
            .then(res => {
                    this.setState({
                        events: res.data.results
                    });
                }
            )
    }

    render() {
        const {events} = this.state;
        return (
            <Layout style={{minHeight: '100vh',paddingTop:'60px'}}>
                <BackTop/>
                <Row type="flex" gutter={{xs: 8, sm: 16, md: 24, lg: 32}}
                     style={{padding: '40px 145px', alignItems: "start"}}>
                    <Col span={3}
                         style={{paddingLeft: '40px', alignItems: "stretch"}}>
                        <div style={{
                            padding: '20px 20px',
                            background: '#fff',
                            borderRadius: '1px',
                            boxShadow: '0 1px 3px rgba(26,26,26,.1)',
                            marginBottom: '10px'
                        }}>
                            <List itemLayout="horizontal">
                                <List.Item>
                                    <Link
                                        to={(window.localStorage.getItem('token') !== null) ? '/create_article' : '/login'}>
                                        <IconFont type='iconfabuhuodong' style={{fontSize: '30px'}}/>
                                    </Link>
                                </List.Item>
                            </List>
                        </div>
                    </Col>
                    <Col span={20} style={{
                        marginBottom: '20px',
                        padding: '20px 20px',
                        backgroundColor: '#fff',
                        boxShadow: '0 1px 3px rgba(26,26,26,.1)',
                        borderRadius: '1px'
                    }}>
                        <List
                            itemLayout="vertical"
                            size="large"
                            pagination={{
                                onChange: page => {
                                    console.log(page);
                                },
                                pageSize: 5,
                            }}
                            dataSource={events}
                            renderItem={item => (
                                <EventList item={item} key={"events-list"}/>
                            )}
                        />
                    </Col>
                </Row>
            </Layout>
        )
    }
}

export default EventListContainer