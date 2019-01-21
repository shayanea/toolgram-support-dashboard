import React, { Component } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

export default class user extends Component {
	// static propTypes = {
	// 	prop: PropTypes
	// }

	render() {
		return <Container />;
	}
}

const Container = styled.div`
	display: block;
	background-color: #2e2f3b;
	min-height: 100vh;
`;
