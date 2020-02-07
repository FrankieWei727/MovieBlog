import React from 'react';
import axios from 'axios';
import {BackTop, Col, Layout, Row, List, Icon} from "antd";
import EventList from "../components/EventList";
import {Link} from "react-router-dom";

const IconFont = Icon.createFromIconfontCN({
    scriptUrl: '//at.alicdn.com/t/font_1621723_un1kxztz8c.js'
});

class EventListContainer extends React.Component {

    state = {
        events: [],
        count: 0,
        page: 1,
        pagesize: 5,
        loading: false,
    };

    componentDidMount() {
        this.setState({
            loading: true
        });
        axios.get("api/movie/events/?format=json&page=" + this.state.page + "&page_size=" + this.state.pagesize)
            .then(res => {
                    let data = [];
                    for (let i = 0; i < res.data.results.length; i++) {
                        data[i] = res.data.results[i];
                    }
                    this.setState({
                        events: data,
                        count: res.data.count,
                        loading: false,
                    });
                }
            )
    }

    handleEvent = async page => {
        this.setState({
            loading: true
        });
        await axios.get("api/movie/events/?format=json&page=" + page + "&page_size=" + this.state.pagesize)
            .then(res => {
                let temp = this.state.events;
                let i = (page - 1) * this.state.pagesize;
                for (let index = 0; index < res.data.results.length; index++) {
                    temp[i] = res.data.results[index];
                    i++;
                }
                this.setState({
                    events: temp,
                    loading: false,
                });
            }).catch(error => {
                console.log(error);
            });
    };

    render() {
        const {events} = this.state;
        return (
            <Layout style={{minHeight: '100vh', paddingTop: '4%'}}>
                <BackTop/>
                <Row style={{flex: '1 0', padding: '3% 4%'}}>
                    <Col xxl={{span: 10, offset: 5}} xl={{span: 13, offset: 2}} md={{span: 15, offset: 1}}
                         xs={{span: 24, offset: 0}}
                         style={{
                             marginBottom: '4%',
                             backgroundColor: '#fff',
                             boxShadow: '0 1px 3px rgba(26,26,26,.1)',
                             borderRadius: '1px',
                             padding: '20px 20px'
                         }}>
                        <List
                            loading={this.state.loading}
                            itemLayout="vertical"
                            size="large"
                            pagination={{
                                onChange: this.handleEvent,
                                total: this.state.count,
                                pageSize: this.state.pagesize,
                            }}
                            dataSource={events}
                            renderItem={item => (
                                <EventList item={item} key={"events-list"}/>
                            )}
                        />
                    </Col>
                    <Col xxl={{span: 4, offset: 0}} xl={{span: 7, offset: 0}} md={{span: 7, offset: 0}}
                         xs={{span: 22, offset: 1}} style={{paddingLeft: '15px'}}>
                        <div style={{
                            padding: '20px 20px',
                            background: '#fff',
                            borderRadius: '1px',
                            boxShadow: '0 1px 3px rgba(26,26,26,.1)',
                            marginBottom: '4%'
                        }}>
                            <div style={{display: 'flex', justifyContent: 'space-between'}}>
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
}

export default EventListContainer