import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Segment, Header, Divider, Form, Button } from 'semantic-ui-react';

/**
 * Class Login
 * Login Component for the App
 */
export default class Login extends React.Component {
	constructor() {
		super();
		this.state = {
			login: {
				userName: null,
				passWord: null
			}
		};
	}

	handleInput = (source, value) => {
		switch (source) {
			case 'username':
				this.setState({
					login: {
						...this.state.login,
						username: value
					}
				});
				break;
			case 'password':
				this.setState({
					login: {
						...this.state.login,
						password: value
					}
				});
				break;
			default:
				break;
		}
	};

	handleLogin = () => {
		//console.log(this.state.login);
	};

	render() {
		return <Container>
			<Segment>
				<Header as='h2'>
					{'Login'}
				</Header>
				<Divider/>
				<Form>
					<Form.Field>
						<label htmlFor="username">
							{'I18N: User Name'}
						</label>
						<input name="username" type="text"
							placeholder="sherlock.holmes@bakerstreet.co.uk"
							onChange={evt => this.handleInput('username', evt.target.value)} />
					</Form.Field>
					<Form.Field>
						<label htmlFor="password">
							{'I18N: Password'}
						</label>
						<input name="password" type="password"
							onChange={evt => this.handleInput('username', evt.target.value)} />
					</Form.Field>
					<Button type="submit" onClick={this.handleLogin}>
						{'Login'}
					</Button>
					<Button>
						<Link to="/register">
							{'Register'}
						</Link>
					</Button>
				</Form>
			</Segment>
		</Container>;
	}
}
