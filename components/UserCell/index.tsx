import type { User } from "@/types";
import style from "./index.module.scss";
import { useEffect, useState, useRef } from "react";

type AnyEvent = MouseEvent | TouchEvent;

function measureTextWidth(users: User[], font = '16px Arial') {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    context!.font = font;
    return users.map(user => context!.measureText(user.name).width + 38);
}

const cellWidth = 200;

function UserSelection({ selectedUsrers, onUsersSelected }: { selectedUsrers: User[], onUsersSelected: (selectedUsers: User[]) => void }) {
    const usersRef = useRef<User[] | null>(null);
    const [users, setUsers] = useState<User[]>([]);
    const [query, setQuery] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(true);
    const userSelectHandler = (user: User) => {
        const selected = selectedUsrers.some((u) => u.email === user.email);
        if (selected) {
            onUsersSelected(selectedUsrers.filter((u) => u.email !== user.email));
        } else {
            onUsersSelected([...selectedUsrers, user]);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch("/api/users");
            const data = await response.json();
            // Simulate a delay
            await new Promise(resolve => {
                setTimeout(resolve, 500);
            });
            setLoading(false);
            setUsers(data);
            usersRef.current = data;
        }
        if (!usersRef.current) {
            fetchData();
        } else {
            setLoading(false);
            setUsers(usersRef.current);
        }
    }, []);

    return (
        <>
            <div className={style.UserCellEditSearch}>
                <input type="text" placeholder="Search..." onClick={(e) => e.stopPropagation()} onKeyUp={(e) => setQuery(e.currentTarget.value)} />
            </div>
            {loading ? <div className={style.UserCellEditList}>Loading...</div> :
                <div className={style.UserCellEditList}>
                    {users.filter(u => {
                        if (query === '') return true;
                        return u.name.toLowerCase().includes(query.toLowerCase());
                    }).map((user) => (
                        <div key={user.email} onClick={() => userSelectHandler(user)} className={`${style.UserCellItem} ${selectedUsrers.some((u) => u.email === user.email) ? style.UserCellItemSelected : ''}`}>
                            <img src={`${user.avatar}${user.email}`} alt={user.name} />
                            <span>{user.name}</span>
                        </div>
                    ))}
                </div>
            }
        </>
    );
}

export default function UserCell({ users, onUsersSelected }: { users: User[], onUsersSelected: (selectedUsers: User[]) => void }) {
    const [calculated, setCalculated] = useState<boolean>(false);
    const [fits, setFits] = useState<number>(0);
    const ref = useRef<HTMLDivElement>(null);
    const [isEditing, setIsEditing] = useState<boolean>(false);

    const handler = () => setIsEditing(false)
    const editingHandler = () => {
        setIsEditing(!isEditing);
    };

    useEffect(() => {
        const listener = (event: AnyEvent) => {
            const el = ref?.current;
            if (!el || el.contains(event.target as Node)) {
                return;
            }
            handler();
        };

        document.addEventListener('mousedown', listener);
        document.addEventListener('touchstart', listener);

        return () => {
            document.removeEventListener('mousedown', listener);
            document.removeEventListener('touchstart', listener);
        };
    }, [ref, handler]);

    useEffect(() => {
        const widths = measureTextWidth(users);
        let sum = 0, count = 0;
        for (let i = 0; i < widths.length; i++) {
            if (sum + widths[i] <= cellWidth) {
                sum += widths[i];
                count++;
            } else {
                break;
            }
        }
        setFits(count);
        setCalculated(true);
    }, [users]);

    return (
        <div className={style.UserCell} ref={ref} onClick={editingHandler}>
            {calculated && users.slice(0, fits).map((user) => (
                <div key={user.email} className={style.UserCellItem}>
                    <img src={`${user.avatar}${user.email}`} alt={user.name} />
                    <span>{user.name}</span>
                </div>
            ))}
            {calculated && fits < users.length && (
                <div className={style.UserCellExtra}>
                    <span className={style.UserCellExtraNumber}>+{users.length - fits}</span>
                    <div className={style.UserCellExtraUsers}>
                        {users.slice(fits).map((user) => (
                            <div key={user.email} className={style.UserCellItem}>
                                <img src={`${user.avatar}${user.email}`} alt={user.name} />
                                <span>{user.name}</span>
                            </div>
                        ))}
                    </div>
                </div>
            )}
            {isEditing && (
                <div className={style.UserCellEdit}>
                    <UserSelection selectedUsrers={users} onUsersSelected={onUsersSelected} />
                </div>
            )}
        </div>
    );
}