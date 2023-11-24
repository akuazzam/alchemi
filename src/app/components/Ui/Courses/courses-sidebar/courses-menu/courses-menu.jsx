"use client"

import styles from "./courses-menu.module.css"
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const CoursesMenu = ({item}) => {

    const pathname = usePathname()
    return (
        <Link href = {item.path} className={`${styles.container} ${pathname === item.path && styles.active}`}>
            {item.icon}
            {item.title}
        </Link>
    )
}

export default CoursesMenu