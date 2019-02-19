import React, { Component } from 'react';
import { Link } from "umi";
import { Badge } from "antd";

class Logo extends Component {
    render() {
        return (
            <Link to="/">
                <h1 className="header-logo">
                    <Badge count={'Alpha'} style={{ backgroundColor: '#52c41a' }}>
                        <span>KWMC</span>
                    </Badge>
                </h1>
            </Link>
        );
    }
}

export default Logo;
