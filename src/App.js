import logo from './logo.svg';
import './App.css';
import React from "react"

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            notes: [],
            title: "",
            details: ""
        }
    }

    updateTitle = (event) => {
        this.setState({ title: event.target.value });
    }

    updateDetails = (event) => {
        this.setState({ details: event.target.value });
    }

    submitHandler = (e) => {
        e.preventDefault();
        if (!this.state.title.length || !this.state.details.length) {
            return;
        }

        const newNote = {
            newTitle: this.state.title,
            newDetails: this.state.details
        }
        this.setState(prevState => ({
            notes: prevState.notes.concat(newNote),
            title: "",
            details: ""
        }))
    }

    deleteHandler = (id) => {
        this.setState(prevState => ({
            notes: prevState.notes.filter((el) => el !== id)
        }))
    }

    render() {
        return ( <
            div >
            <
            h1 className = "App-header" > Note It < /h1> <
            NoteForm titleValue = { this.state.title }
            detailsValue = { this.state.details }
            titleHandle = { this.updateTitle }
            detailsHandle = { this.updateDetails }
            onSubmit = { this.submitHandler }
            /> <
            div > {
                this.state.notes.map((note, i) => ( <
                    NoteEntry key = { note.newTitle }
                    title = { note.newTitle }
                    details = { note.newDetails }
                    deleteNote = { this.deleteHandler.bind(this, note) }
                    />
                ))
            } <
            /div> <
            /div>
        );
    }
}

class NoteEntry extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            display: false,
            editing: false,
            editTitle: this.props.title,
            editDetails: this.props.details
        }
    }

    displayToggle = () => {
        this.setState(prevState => ({
            display: !prevState.display
        }))
    }

    edit = () => {
        this.setState({
            editing: true
        })
    }

    save = () => {
        let titleVal = this.updateTitle.value;
        let detailsVal = this.updateDetails.value;

        if (!titleVal.length || !detailsVal.length) {
            return;
        } else {
            this.setState({
                editTitle: titleVal,
                editDetails: detailsVal,
                editing: false
            })
        }
    }

    render() {
        const editedTitle = this.state.editTitle;
        const editedDetails = this.state.editDetails;
        const editing = this.state.editing;
        const display = this.state.display;

        return ( <
            div className = "container" >
            <
            div onClick = { editing ? null : this.displayToggle } > {
                editing ? ( <
                    input ref = "updateTitle"
                    type = "text"
                    defaultValue = { editedTitle }
                    />
                ) : ( <
                    h2 > { editedTitle } < /h2>
                )
            } {} <
            /div> <
            hr / >
            <
            div > {
                editing ? ( <
                    textarea ref = "updateDetails"
                    cols = "10"
                    rows = "2"
                    defaultValue = { editedDetails } > < /textarea>
                ) : ( <
                    div >
                    <
                    h3 > Details: < /h3> <
                    p > { editedDetails } < /p> <
                    /div>
                )
            } <
            div >
            <
            button onClick = { this.props.deleteNote } > Delete < /button> <
            /div> <
            /div> <
            /div>
        )
    }
}

const NoteForm = (props) => {
    return ( <
        div >
        <
        form >
        <
        input className = "title-input"
        type = "type"
        placeholder = "Title"
        value = { props.titleValue }
        onChange = { props.titleHandle }
        /> <
        br / >
        <
        textarea className = "details-input"
        cols = "20"
        rows = "3"
        placeholder = "Details"
        value = { props.detailsValue }
        onChange = { props.detailsHandle }
        /> <
        br / >
        <
        button onClick = { props.onSubmit } >
        Add Note <
        /button> <
        /form> <
        /div>
    )
}

export default App;