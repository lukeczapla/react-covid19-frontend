import React from 'react';

class SecondarySelect extends React.Component {
    constructor(props) {
        super(props);
        this.state = {


        };
    }

    selectChange = (e) => {
        console.log('secondaryChange');
        if (this.props.selectChanged) this.props.selectChanged(e);
//        console.log(e.target.selectedOptions);
//        let value = Array.from(e.target.selectedOptions, option => option.value);
//        console.log(value);
//        this.setState({values: value});
    }

    secondaryChange = (e) => {
        if (this.props.secondaryChanged) this.props.secondaryChanged(e);
    }

    render() {
        const delStyle = {
            minWidth: '100%',
            minHeight: '100%'
        };
        return(
        <table border="2">
        <thead>
        <tr>
            <td colSpan="3">Add students and staff members related/possibly exposed by person of this report:</td>
        </tr>
        </thead>
        <tbody>
            <tr>
                <td>
                    <select name="addList" size="10" value={this.props.selectedPeople} onChange={this.selectChange} multiple={true}>
                        {this.props.people.filter((people) => this.props.secondaryAdded.indexOf(people.id+'') === -1).map((person) => (
                                <option value={person.id} key={person.id}>{person.lastName + ", " + person.firstName + " " + person.id}</option>
                        ))}
                    </select>
                </td>
                <td>
                    <select style={delStyle} name="deleteList" size="10" value={this.props.secondarySelected} onChange={this.secondaryChange}>
                        {this.props.people.filter((people) => this.props.secondaryAdded.indexOf(people.id+'') !== -1).map((person) => (
                                <option value={person.id} key={person.id}>{person.lastName + ", " + person.firstName + " " + person.id}</option>
                        ))}
                    </select>
                </td>
                <td>
                    <table>
                      <tbody>
                        <tr>
                            <td><input type="checkbox" name="exposedClassOutsideFirst" checked={this.props.exposedClassOutsideFirst} onChange={this.props.secondaryPropChange}/>Exposed in class outdoors, first degree</td>
                            <td><input type="checkbox" name="exposedClassOutside" checked={this.props.exposedClassOutside} onChange={this.props.secondaryPropChange}/>Exposed in class outdoors, non-first degree</td>
                        </tr>
                        <tr>
                            <td><input type="checkbox" name="exposedClassFirst" checked={this.props.exposedClassFirst} onChange={this.props.secondaryPropChange}/>Exposed in class in building, first degree</td>
                            <td><input type="checkbox" name="exposedClass" checked={this.props.exposedClass} onChange={this.props.secondaryPropChange}/>Exposed in class in building, non-first degree</td>
                        </tr>
                        <tr>
                            <td><input type="checkbox" name="exposedBusFirst" checked={this.props.exposedBusFirst} onChange={this.props.secondaryPropChange}/>Exposed on bus, first degree</td>
                            <td><input type="checkbox" name="exposedBus" checked={this.props.exposedBus} onChange={this.props.secondaryPropChange}/>Exposed on bus, non-first degree</td>
                        </tr>
                        <tr>
                            <td><input type="checkbox" name="exposedCarpool" checked={this.props.exposedCarpool} onChange={this.props.secondaryPropChange}/>Exposed in carpool</td>
                            <td><input type="checkbox" name="exposedOutside" checked={this.props.exposedOutside} onChange={this.props.secondaryPropChange}/>Exposed outside of school</td>
                        </tr>
                      </tbody>
                    </table>
                 </td>
            </tr>
            <tr>
                <td colSpan="1" align="center">
                    <button type="button" onClick={this.props.addSecondary}>Add ---></button>
                </td>
                <td colSpan="1" align="center">
                    <button type="button" onClick={this.props.removeSecondary}>{'<--- Remove'}</button>
                </td>
                <td>
                </td>
            </tr>
        </tbody>
        </table>
        );

    }

}

export default SecondarySelect;