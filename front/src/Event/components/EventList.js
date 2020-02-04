import React, {Component} from "react";
import {Icon, List} from "antd";

const briefLength = 350;
const IconFont = Icon.createFromIconfontCN({
    scriptUrl: '//at.alicdn.com/t/font_1621723_jqgxq54ls7o.js'
});

class EventList extends Component {

    extractText = HTMLString => {
        let span = document.createElement("span");
        span.innerHTML = HTMLString;
        return span.textContent || span.innerText;
    };
    extractBrief = HTMLString => {
        const text = this.extractText(HTMLString);
        // const text = HTMLString;
        if (text.length > briefLength) {
            return text.slice(0, briefLength) + "……";
        }
        return text;
    };

    render() {
        const {item} = this.props;
        return (
            <List.Item
                key={item.title}
                actions={[
                    <span>
                        <IconFont type="icondizhi" style={{marginRight: 8}}/>
                        {item.location}
                    </span>,
                    <span>
                        <IconFont type="iconColor-Caption" style={{marginRight: 8}}/>
                        {item.start_date} to {item.end_date}
                    </span>,
                ]}
                extra={
                    <img
                        width={272}
                        alt="logo"
                        src={item.poster}
                        style={{width: "135px",}}
                    />
                }>
                {/* <List.Item.Meta
                                        avatar={<Avatar src={item.avatar} />}
                                        title={<a href={item.href}>{item.title}</a>}
                                        description={item.description}
                                        /> */}
                <List.Item.Meta
                    title={<a href={'/event/' + item.id}>{item.title}</a>}
                />
                <div className='braft-output-content' style={{overflow: 'auto'}}
                     dangerouslySetInnerHTML={{__html: this.extractBrief(item.content)}}/>
            </List.Item>
        )

    }
}

export default EventList
