import React from "react";
import {Calendar, momentLocalizer} from 'react-big-calendar'
import moment from 'moment'
import * as dates from '../../utils/dates'
import Store from "../../flux/store";
import {Actions} from "../../flux";


// core components


class ScheduleSection extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            // events: Store.getEvents(),
        };

        this.onChange = this.onChange.bind(this);
    }

    componentWillMount() {
        Store.addChangeListener(this.onChange);
    }

    componentWillUnmount() {
        Store.removeChangeListener(this.onChange);
    }

    componentDidMount() {
        // Actions.getEvents();
    }

    onChange() {
        this.setState({
            ...this.state,
            // events: Store.getEvents().items,
        });
    }

    render() {
        // const {events} = this.state;

        const localizer = momentLocalizer(moment);

        localizer.formats.agendaHeaderFormat = ({start, end}, culture, localizer) =>
            localizer.format(start, "D MMM y", culture) + ' - ' +
            localizer.format(end, "D MMM y", culture)

        const ColoredDateCellWrapper = ({children}) =>
            React.cloneElement(React.Children.only(children), {
                style: {
                    backgroundColor: 'lightblue',
                },
            });


        return (
            <div id="latest"
                 className="latest-entry mb-5"
            >
                <h3 className="pt-5 text-center font-weight-600 mb-3">SCHEDULE AND EVENTS</h3>
                <div className="px-5">
                    <Calendar
                        events={[]}
                        // events={[
                        //     {
                        //         id: 0,
                        //         title: 'All Day Event very long title',
                        //         allDay: true,
                        //         start: new Date(2020, 6, 14),
                        //         end: new Date(2020, 6, 26),
                        //     },
                        //     {
                        //         id: 1,
                        //         title: 'Long Event',
                        //         start: new Date(2020, 6, 9, 9, 40),
                        //         end: new Date(2020, 6, 15),
                        //     }
                        // ]}
                        views={["agenda", "month"]}
                        popup
                        defaultView="agenda"
                        step={60}
                        length={365}
                        showMultiDayTimes
                        max={dates.add(dates.endOf(new Date(new Date().getFullYear(), 12, 1), 'day'), -1, 'hours')}
                        defaultDate={new Date()}
                        components={{
                            timeSlotWrapper: ColoredDateCellWrapper,
                        }}
                        localizer={localizer}
                        style={{height: "430px"}}
                    />
                </div>
            </div>
        )
    }
}

export default ScheduleSection;
