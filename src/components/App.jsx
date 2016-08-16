import React from 'react';
import fetch from 'isomorphic-fetch';
// need to figure out based on new approach, buttons for catagories
// correctly setting the question used in quiz and then making sure to calcuate 
// the right/wrong based on the quiz answer'd questions. Do not think 'step' field 
// is needed at but left just in case.  


export default class App extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			title: null,
			quiz: {},
			displayCatagories: true,
			categoriesList: '',
			step: 0
		}
	}


	// getting data.
	componentDidMount() {
		console.log('componentDidMount!');
		this._callAPI();

	}


	render() {

		if (this.state.quiz.length > 0) {

				return (
							<div>
								<div> <h1> display header here </h1> </div>
								<div>
								  <p> this will display the catagories page </p>				
								</div>
							</div>				
							)
			} else {

						return (
							<div>
								<div> <h1> display header here </h1> </div>
								<div>
								  <p> this will display the questions and answers page </p>				
								</div>
							</div>
						)
					}
				}
			}
		} else {
			return (<h1>loading page...this means that mounting is having an issue</h1>)
		}


	}

	_callAPI = () => {
		const self = this;

		fetch('../src/lib/fake_api.json')
			.then(responseData => responseData.json())
			.then(responseData => {
			 
				let ctr = 0;
				let catagoryQuestion = '';

				const mapCategoriesList = responseData[0].categories.map(val => {

					for (var i = 0; i < val.questions.length; i++) {
						catagoryQuestion = {
							id: val.questions[i].id,
							subject: val.subject,
							color: val.color,
							question: val.questions[i].question_text,
							possibleAnswers: val.questions[i].choices,
							questionCompleted: false
						}
						self.state.quiz[ctr] = catagoryQuestion;
						ctr ++;
					}
					return {
						subject: val.subject
					}
				});
				self.setState({
					title: responseData[0].name,
					categoriesList: mapCategoriesList

				})
			});
	}
}
