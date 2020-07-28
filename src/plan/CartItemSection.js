import React from 'react';
import PropTypes from 'prop-types';
import Section from './Section'
import { CSSTransition } from 'react-transition-group'
import { FaRegSquare, FaRegCheckSquare, FaTrash, FaInfoCircle } from 'react-icons/fa';


export default class CartItemSection extends React.Component {
    constructor(props) {
		super(props);
		this.state = {
            checked: true,
            infoClicked: false
        };
		this.handleClick = this.handleClick.bind(this);
        this.handleInfoClick = this.handleInfoClick.bind(this);
    }

    async handleClick() {
        console.log('handling cart item click');
        await this.setState(state => ({
            checked: !state.checked
        }));  
        // TODO: this is getting into reducer territory
        console.log('clicked on section: ' + this.props.section.course_id);
        if(this.state.checked) {
            this.props.handleSelectedSection(this.props.section, "ADD");
        } else {
            this.props.handleSelectedSection(this.props.section, "REMOVE");
        }
    }

    handleInfoClick(event) {
        event.stopPropagation();
        event.nativeEvent.stopImmediatePropagation();
        this.setState(state => ({
            infoClicked: !state.infoClicked
        }));  
    }

    render() {
        const { section, handleRemoveCartItem } = this.props;
        const { checked, infoClicked } = this.state;

        let dropdownClasses = infoClicked ?
            "cart-dropdown"
            : "cart-dropdown active"

        return (
            <li key={section.course_id} id={section.course_id} className="selector-row" onClick={this.handleClick}>
                <div className="row-item item cart">
                    {checked
                        ? <FaRegCheckSquare className={"checkbox fa pr-5"} />
                        : <FaRegSquare className={"checkbox fa pr-5"} />
                    }
                    <div className={"details"}>
                        <div className="flex-row">
                            <h3 className={"title"}>{section.course_name}</h3>
                            <p className={"subtitle-2 pl-5 flex-end"}>{section.course_id}</p>
                        </div>
                        <p className={"subtitle-1"}>{section.course_title}</p>
                        {section.meeting_times.map((meeting, index) => (
                            <p key={index} className={"subtitle-2"}>{meeting.days}{"\t\t"}{meeting.time}</p>
                        ))}
                    </div>
                    <FaTrash className={"item-icon fa pr-5 r-20"} size={16} onClick={(e) => handleRemoveCartItem(e, "SECTION", section)} />
                    <FaInfoCircle className={"item-icon fa pr-5 r-50"} size={16} onClick={(e) => this.handleInfoClick(e)} />
                </div>
                 {/* <div className="cart-dropdown"> */}
                    <CSSTransition in={infoClicked} classNames="dropdown" timeout={600} unmountOnExit> 
                        <Section section={section} />
                    </CSSTransition>
                 {/* </div> */}
            </li>
        )
    }
}

CartItemSection.propTypes = {
    section: PropTypes.object.isRequired,
};
