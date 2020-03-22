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
            <Layout style={{margin: "40px 0"}}>
                <BackTop/>
                <Row gutter={[{xs: 0, sm: 0, md: 24}, {xs: 16, sm: 16, md: 0}]}>
                    <Col xxl={{span: 13, offset: 3}}
                         xl={{span: 14, offset: 2}}
                         lg={{span: 14, offset: 2}}
                         md={{span: 16, offset: 1, order: 1}}
                         sm={{span: 22, offset: 1, order: 2}}
                         xs={{span: 22, offset: 1}}
                         style={{
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
                    <Col xxl={{span: 5, offset: 0}}
                         xl={{span: 6, offset: 0}}
                         lg={{span: 6, offset: 0}}
                         md={{span: 6, offset: 0, order: 2}}
                         sm={{span: 22, offset: 1, order: 1}}
                         xs={{span: 22, offset: 1}}
                    >
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
