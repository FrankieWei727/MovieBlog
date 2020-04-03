import React, {useEffect, useState} from 'react'
import {Layout, Row, Col, Tabs, BackTop} from 'antd'
import SubMenu from "../../Home/components/SubMenu";
import ArticleList from "../components/ArticleList";
import SubscriptionArticleList from "../components/SubscriptionArticleList";
import PromotionList from "../components/Promotion";
// import MicroList from './MicroList'
// import PropertyRank from './PropertyRank'

const TabPane = Tabs.TabPane;

const Articles = () => {

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

    return (
        <div>
            {deskWidth < 500 ? <SubMenu menuKey={'article'}/> : null}
            <Layout style={{margin: "40px 0",backgroundColor:"#DEDEDE"}}>
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
                        {deskWidth > 500 ? <PromotionList/> : null}
                        {/*<MicroList />*/}
                        {/*<PropertyRank />*/}
                        {/*<Advertisement />*/}
                    </Col>
                </Row>
            </Layout>
        </div>
    )
};

export default Articles
