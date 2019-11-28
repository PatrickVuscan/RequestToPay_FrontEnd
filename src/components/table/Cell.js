// Adapted from: https://engineering.shopify.com/blogs/engineering/building-data-table-component-react

import * as React from 'react';

export default function Cell({height, content, fixed, header,}) {

    const fixedClass = fixed ? ' Cell-fixed' : '';
    const headerClass = header ? ' Cell-header' : '';
    const style = height ? {height: `${height}px`} : undefined;

    const className = (
        `Cell${fixedClass}${headerClass}`
    );

    const cellMarkup = header ? (
        // Add scope="col" to thead cells
        <th scope="col" className={className} style={style}>
            {content}
        </th>
    ) : (
        // THIS WOULD MAKE THE FIRST COLUMN BOLDED (th) LIKE THE HEADERS:
        // fixed ? (
        //     // Add scope="row" to the first cell of each tbody row
        //     <th scope="row" className={className} style={style}>
        //         {content}
        //     </th>
        // ) : (
        //     <td className={className} style={style}>
        //         {content}
        //     </td>
        // )
        // TODO: Either use the implementation above or remove "fixed"
        <td className={className} style={style}>
            {content}
        </td>
    );

    return (cellMarkup);
}
