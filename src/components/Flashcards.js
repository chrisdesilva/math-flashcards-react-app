import React from 'react';
import '../styles/Flashcards.css'

class Flashcards extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      problemTop: '',
      operation: '',
      bottomNumber: '',
      answer: ''
    }
    this.handleChange = this.handleChange.bind(this);
    this.checkAnswer = this.checkAnswer.bind(this);
  }

  handleChange(e) {
    e.preventDefault();
    this.setState({answer: Number(e.target.value)})
  }

  generateTop = (min, max) => {
    let topNumber = Math.floor(Math.random() * (max - min) + min);
    this.setState({problemTop: topNumber})
  }

  generateBottom = (min, max) => {
    let bottomNumber = Math.floor(Math.random() * (max - min) + min);
    this.setState({bottomNumber: bottomNumber})
  }

  addition = () => {
    this.generateTop(0, 100);
    this.generateBottom(0, 100);
    this.setState({operation: '+'})
  }

  checkAnswer() {
    if(this.state.problemTop + this.state.bottomNumber === this.state.answer){
      this.setState({answer: ''})
      this.addition();
    }
  }

  render(){
    return (
      <div>
        <h1 id="h1">Practice Math!</h1>
        <div id="problemTop">{this.state.problemTop}</div>
        <div id="operation">{this.state.operation}</div>
        <div id="bottomNumber">{this.state.bottomNumber}</div>
        <div id="problemAnswer">
          <input type="text" id="answerBox" onChange={this.handleChange} value={this.state.answer}/>
        </div>
        <button onClick={this.checkAnswer}>Check Answer</button>  
        <button onClick={this.addition}>Get New Problem</button>
      </div>
    )
  }
}

export default Flashcards