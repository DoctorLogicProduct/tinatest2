import React, { FC } from "react";
import { classNames } from "tinacms";

import { HomeBlocksRotatorItems } from "../../../tina/__generated__/types";

import styles from "./RotatorItem.module.scss";

type RotatorItemParams = {
    data: HomeBlocksRotatorItems;
    onClick?: () => void;
    selected: boolean;
    tinaField: string;
};

export const RotatorItem: FC<RotatorItemParams> = ({
    data,
    onClick,
    selected,
    tinaField,
}) => {
    if (!data.image) {
        return null;
    }

    return (
        <div
            className={classNames(styles.item, selected ? styles.selected : "")}
        >
            <div
                onClick={onClick}
                data-tinafield={`${tinaField}`}
                className={styles.wrapper}
            >
                <div
                    className={styles.image}
                    data-tinafield={`${tinaField}.image`}
                >
                    <img src={data.image} alt={data.image_alt} />
                </div>
                {data.title && (
                    <h3
                        className={styles.image__headline}
                        data-tinafield={`${tinaField}.title`}
                    >
                        {data.title}
                    </h3>
                )}
            </div>
        </div>
    );
};
