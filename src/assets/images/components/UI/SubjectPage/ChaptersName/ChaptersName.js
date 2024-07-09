import React from 'react';
import './ChaptersName.css';

function ChaptersName(props) {

    const [showAll, setShowAll] = React.useState(false);

    const maxNum = props.chapterNames.length - 1;

    React.useEffect(() => {
        if (maxNum <= 8) {
            setShowAll(true);
        }
    }, [])

    function chapterNumber(num) {
        if (num < 10) {
            return `0${num}`;
        } else {
            return num;
        }
    }

    const showLess = (
        <section className='chapter-name'>
            {props.chapterNames.map((element, index) => {
                if (index < 8) {
                    return <p>Chapter {chapterNumber(index)}: {element}.</p>
                }
            })}
            {maxNum > 8 && <p id='maxChapterNumber'>Chapter {chapterNumber(maxNum)}: {props.chapterNames[maxNum].slice(0, 10) + "..."}</p>}
            <p id='seeMore' onClick={() => setShowAll(true)}>See More</p>
        </section>
    )

    const showMore = (
        <section className='chapter-name'>
            {props.chapterNames.map((element, index) => {
                return <p>Chapter {chapterNumber(index)}: {element}.</p>
            })}
            {maxNum > 8 && <p id='seeLess' onClick={() => setShowAll(false)}>See Less</p>}
        </section>
    )

    // if (props.chapterNames.length < 8) {
    //     return showMore;
    // }

    return (
        showAll ? showMore : showLess
    )
}

export default ChaptersName;