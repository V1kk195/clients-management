import cx from 'classnames';
import { ReactNode } from 'react';

import styles from './Accordion.module.scss';

type Props<T> = {
    list: T[];
    getHeading: (item: T) => string | ReactNode;
    renderHeaderButtons?: (item: T) => ReactNode;
    renderBody: (item: T) => ReactNode;
    id: string;
    classname?: string;
};

export const Accordion = <T extends { id: string | number }>({
    list,
    renderHeaderButtons,
    renderBody,
    getHeading,
    id,
    classname,
}: Props<T>) => {
    return (
        <div
            className={cx('accordion', styles.appAccordion, classname)}
            id={id}
        >
            {list?.map((item) => {
                const accordionId = `${id}${item.id}`;

                return (
                    <div
                        className="accordion-item mb-3 border-top"
                        key={accordionId}
                    >
                        <h2 className="accordion-header flex-row justify-content-between">
                            <button
                                className="accordion-button collapsed flex-row-reverse justify-content-end gap-3"
                                type="button"
                                data-bs-toggle="collapse"
                                data-bs-target={`#collapse${accordionId}`}
                                aria-expanded="false"
                                aria-controls={`collapse${accordionId}`}
                            >
                                {getHeading(item)}
                            </button>

                            <div className={styles.customButtons}>
                                {renderHeaderButtons
                                    ? renderHeaderButtons(item)
                                    : null}
                            </div>
                        </h2>

                        <div
                            id={`collapse${accordionId}`}
                            className="accordion-collapse collapse"
                            data-bs-parent={`#${id}`}
                        >
                            <div className="accordion-body" key={accordionId}>
                                {renderBody(item)}
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};
