import React from 'react';
import { driverTaskString } from '../type/DriverTaskType';
import DriverTask from '../model/DriverTask';
import { createHoursArr, hoursToTimeString } from '../util/time_util';
import CalendarColumn from './CalendarColumn';

interface IProps {
    tasks: DriverTask[];
}

export default function Calendar(props: IProps) {
    const hoursArr: number[] = createHoursArr();
    const daysArr: string[] = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    const cellWidth = 120;
    const cellHeight = 60;
    const padding = 8;

    const {tasks} = props;

    return (
        <div style={{
            width: "100%",
            padding: padding + "px",
            display: "flex",
        }}>
            <CalendarColumn
                cellWidth={cellWidth}
                cellHeight={cellHeight}
                rows={hoursArr.map((hour) => hoursToTimeString(hour))}
            />
            {daysArr.map((v, i) => (
                <div key={i} style={{
                    position: "relative",
                }}>
                    <CalendarColumn
                        cellWidth={cellWidth}
                        cellHeight={cellHeight}
                        header={v}
                        rows={new Array(24).fill("")}
                    />
                    <div style={{
                        position: "absolute",
                        top: 0,
                        bottom: 0,
                        left: 0,
                        right: 0
                    }}>
                        {tasks.map((task) => {
                            if (task.day !== i) {
                                return <></>;
                            }

                            return (
                                <div style={{
                                    position: "absolute",
                                    backgroundColor: "#3174ad",
                                    borderRadius: "8px",
                                    top: (cellHeight + padding + cellHeight * task.start) + "px",
                                    height: ((task.end - task.start) * cellHeight) + "px",
                                    width: "100%",
                                }}>
                                    <span style={{
                                        color: "white",
                                    }}>
                                        {driverTaskString(task.type)}
                                    </span>
                                </div>
                            );
                        })}
                    </div>
                </div>
            ))}
        </div>
    );
}