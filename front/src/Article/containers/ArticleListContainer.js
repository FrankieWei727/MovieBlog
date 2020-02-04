import React, {Component} from 'react'
import {Layout, Row, Col, Tabs, Form, BackTop} from 'antd'
import {withRouter} from 'react-router'

import ArticleList from "../components/ArticleList";
import SubscriptionArticleList from "../components/SubscriptionArticleList";
import PromotionList from "../components/Promotion";
// import MicroList from './MicroList'
// import PropertyRank from './PropertyRank'

const TabPane = Tabs.TabPane;
class BlogList extends Component {
    state = {
        collapsed: false
    };

    onCollapse = (collapsed) => {
        console.log(collapsed);
        this.setState({collapsed})
    };

    render() {
        return (
            <Layout style={{minHeight: '100vh',paddingTop:'60px'}}>
                <BackTop/>
                <Row style={{flex: '1 0', padding: '40px 60px'}}>
                    <Col xxl={{span: 10, offset: 5}} xl={{span: 13, offset: 2}} md={{span: 15, offset: 1}}
                         xs={{span: 24, offset: 0}} style={{
                        marginBottom: '20px',
                        backgroundColor: '#fff',
                        boxShadow: '0 1px 3px rgba(26,26,26,.1)',
                        borderRadius: '1px'
                    }}>
                        <div className="card-container">
                            <Tabs defaultActiveKey='1' type="card">
                                <TabPane tab='All' key='1'>
                                    <ArticleList/>
                                </TabPane>
                                <TabPane tab='Subscription' key='2'>
                                    <SubscriptionArticleList/>
                                </TabPane>
                            </Tabs>
                        </div>
                    </Col>
                    <Col xxl={{span: 4, offset: 0}} xl={{span: 7, offset: 0}} md={{span: 7, offset: 0}}
                         xs={{span: 22, offset: 1}} style={{paddingLeft: '15px'}}>
                        <PromotionList/>
                        {/*<MicroList />*/}
                        {/*<PropertyRank />*/}
                        {/*<Advertisement />*/}
                    </Col>
                </Row>
            </Layout>
        )
    }
}

const Blog = withRouter(Form.create()(BlogList));

export default Blog
