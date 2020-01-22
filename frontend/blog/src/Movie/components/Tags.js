import React from 'react';
import {Collapse, Icon, List, Tag, Typography} from "antd";

const Panel = Collapse.Panel;
const {Title} = Typography;
const CheckTag = Tag.CheckableTag;

const customPanelStyle = {
    background: "#fff",
    borderRadius: 4,
    marginBottom: 24,
    border: 0,
    overflow: "hidden"
};
const Tags = (props) => {

    return (
        <div>
            <Collapse
                bordered={false}
                defaultActiveKey={["1"]}
                expandIcon={({isActive}) => (
                    <Icon type="caret-right" rotate={isActive ? 90 : 0}/>
                )}
                style={{paddingTop: "10px"}}
            >
                <Panel
                    header={<Title level={4}>Tags</Title>}
                    key="1"
                    style={customPanelStyle}
                >
                    <List
                        size="small"
                        dataSource={props.data}
                        renderItem={item => (
                            <List.Item>
                                <div style={{
                                    display: "flex",
                                    justifyContent: "flex-start",
                                    flexWrap: "wrap",
                                    alignItems: "center"
                                }}>
                                                  <span
                                                      style={{
                                                          backgroundColor: "#5F5E5E",
                                                          borderRadius: "16px 0 16px 16px",
                                                          padding: "5px 15px",
                                                          color: "white",
                                                          margin: "0 24px 0 0"
                                                      }}
                                                  >
                                                    {item.name}
                                                  </span>
                                    {item.category.map(tag => (
                                        <CheckTag
                                            style={{
                                                padding: "5px 10px",
                                                borderRadius: "20px"
                                            }}
                                            key={"tag_id" + tag.name}
                                            checked={
                                                props.selectedTags.indexOf(tag) > -1
                                            }
                                            onChange={checked => props.handleChange(tag, checked)}
                                        >
                                            {tag.name}
                                        </CheckTag>
                                    ))}
                                </div>
                            </List.Item>
                        )}
                    />
                </Panel>
            </Collapse>
        </div>
    )

};

export default Tags