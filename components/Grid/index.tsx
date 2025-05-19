
import type { Grid as GridType, User } from "@/types";
import UserCell from "../UserCell";
import style from "./index.module.scss";
import { useState } from "react";

const getCellStyle = (type: string) => style[`gridBodyItem${type[0].toUpperCase() + type.slice(1)}`]
const formatNumber = (num: number, locale = 'en-US') => new Intl.NumberFormat(locale).format(num);

export default function Grid({ gridData }: { gridData: GridType }) {
    const [data, setData] = useState<GridType>(gridData);
    const onUsersSelectedHandler = (rowIndex: number, columnIndex: number, selectedUsers: User[]) => {
        const newData = [...data.data];
        const column = newData[rowIndex][columnIndex];
        if (column.type === "users") {
            newData[rowIndex][columnIndex] = {
                ...column,
                users: selectedUsers,
            };
        }
        setData({
            ...data,
            data: newData,
        });
    };
    return (
        <>
            <h2>{data.name}</h2>
            <div className={style.grid}>
                <div className={style.gridHeader}>
                    {data.headers.map((header, index) => (
                        <div key={index} className={style.gridHeaderItem}>
                            {header}
                        </div>
                    ))}
                </div>
                <div className={style.gridBody}>
                    {data.data.map((row, rowIndex) => (
                        <div key={rowIndex} className={style.gridBodyRow}>
                            {row.map((column, columnIndex) => (
                                <div key={columnIndex} className={`${style.gridBodyItem} ${getCellStyle(column.type)}`}>
                                    {column.type === "link" && (
                                        <a href={column.url} target="_blank" rel="noopener noreferrer">
                                            {column.label}
                                        </a>
                                    )}
                                    {column.type === "tag" && (
                                        <span>
                                            {column.label}
                                        </span>
                                    )}
                                    {column.type === "number" && <span>{formatNumber(column.value)}</span>}
                                    {column.type === "text" && <span>{column.value}</span>}
                                    {column.type === "users" && (
                                        <UserCell users={column.users} onUsersSelected={(selectedUsers) => onUsersSelectedHandler(rowIndex, columnIndex, selectedUsers)} />
                                    )}
                                </div>
                            ))}
                        </div>
                    ))}

                </div>
            </div>
        </>
    )
}