const courseUnits = [
    {
        id: 1037,
        courseId: 5,
        url: "/youtube-1",
        name: "youtube-1"
    },
    {
        id: 1038,
        courseId: 5,
        url: "/youtube-2",
        name: "youtube-2"
    },
    {
        id: 1039,
        courseId: 5,
        url: "/youtube-3",
        name: "youtube-3"
    },
    {
        id: 1040,
        courseId: 5,
        url: "/youtube-4",
        name: "youtube-4"
    },
    {
        id: 1,
        courseId: 1,
        url: "/murphy-one-unit-one-present-continuous",
        name: "Unit 1: Present continuous (I'm doing)",
    },
    {
        id: 2,
        courseId: 1,
        url: "/murphy-one-unit-two-present-simple",
        name: "Unit 2 - Present simple (I do). Part 1",
    },
    {
        id: 3,
        courseId: 1,
        url: "/murphy-one-unit-three",
        name: "Unit 3 - Present continuous and present simple 1 (I am doing and I do)",
    },
    {
        id: 4,
        courseId: 1,
        url: "/murphy-one-unit-four",
        name: "Unit 4 - Present continuous and present simple 2 (I am doing and I do)",
    },
    {
        id: 5,
        courseId: 1,
        url: "/murphy-one-unit-five",
        name: "Unit 5 - Past simple (I did)",
    },
    {
        id: 6,
        courseId: 1,
        url: "/murphy-one-unit-six",
        name: "Unit 6 - Past continuous (I was doing)",
    },
    {
        id: 7,
        courseId: 1,
        url: "/murphy-one-unit-seven",
        name: "Unit 7 - Present perfect 1 (I have done)",
    },
    {
        id: 8,
        courseId: 1,
        url: "/murphy-one-unit-eight",
        name: "Unit 8 - Present perfect 2 (I have done)",
    },
    {
        id: 9,
        courseId: 1,
        url: "/murphy-one-unit-nine",
        name: "Unit 9 - Present perfect continuous (I have been doing)",
    },
    {
        id: 204,
        courseId: 2,
        url: "/m1unit4",
        name: "Unit 4",
    },
    {
        id: 205,
        courseId: 2,
        url: "/m1unit5",
        name: "Unit 5",
    },
    //school 8
    {
        id: 300,
        courseId: 3,
        url: "/school-8/welcome",
        name: "Welcome unit 1",
    },
    {
        id: 301,
        courseId: 3,
        url: "/school-8/unit-1/lesson-1",
        name: "item 1 lesson 1"
    },
    {
        id: 302,
        courseId: 3,
        url: "/school-8/unit-1/lesson-4",
        name: "item 1 lesson 4"
    },
    {
        id: 303,
        courseId: 3,
        url: "/school-8/unit-1/lesson-5",
        name: "item 1 lesson 5"
    },
    {
        id: 304,
        courseId: 3,
        url: "/school-8/unit-1/lesson-6",
        name: "item 1 lesson 6"
    },
    {
        id: 1001,
        courseId: 4,
        url: "/common-phrases-1",
        name: "Common phrases 1"
    },
    {
        id: 1002,
        courseId: 4,
        url: "/common-phrases-2",
        name: "Common phrases 2"
    },
    {
        id: 1003,
        courseId: 4,
        url: "/common-phrases-3",
        name: "Common phrases 3"
    },
    {
        id: 1004,
        courseId: 4,
        url: "/common-phrases-4",
        name: "Common phrases 4"
    },
    {
        id: 1005,
        courseId: 4,
        url: "/common-phrases-5",
        name: "Common phrases 5"
    },
    {
        id: 1006,
        courseId: 4,
        url: "/common-phrases-6",
        name: "Common phrases 6"
    },
    {
        id: 1007,
        courseId: 4,
        url: "/common-phrases-7",
        name: "Common phrases 7"
    },
    {
        id: 1008,
        courseId: 4,
        url: "/common-phrases-8",
        name: "Asking Directions in English"
    },
    {
        id: 1009,
        courseId: 4,
        url: "/common-phrases-9",
        name: "Giving Directions in English"
    },
    {
        id: 1010,
        courseId: 4,
        url: "/common-phrases-10",
        name: "Ways to Say NO in English"
    },
    {
        id: 1011,
        courseId: 4,
        url: "/common-phrases-11",
        name: "Ways to Say I MISS YOU"
    },
    {
        id: 1012,
        courseId: 4,
        url: "/common-phrases-12",
        name: "Phrases for Staying at a Hotel"
    },
    {
        id: 1013,
        courseId: 4,
        url: "/common-phrases-13",
        name: "English Classroom Phrases"
    },
    {
        id: 1014,
        courseId: 4,
        url: "/common-phrases-14",
        name: "Ways to Say HELLO"
    },

    {
        id: 1015,
        courseId: 4,
        url: "/common-phrases-15",
        name: "Phrases in Shopping"
    },
    {
        id: 1016,
        courseId: 4,
        url: "/common-phrases-16",
        name: "Ways to Say GOOD LUCK"
    },
    {
        id: 1017,
        courseId: 4,
        url: "/common-phrases-17",
        name: "Ways to Say GOOD JOB"
    },
    {
        id: 1018,
        courseId: 4,
        url: "/common-phrases-18",
        name: "Ways to Say I AGREE"
    },
    {
        id: 1019,
        courseId: 4,
        url: "/common-phrases-19",
        name: "Ways to Say I’M SORRY"
    },
    {
        id: 1020,
        courseId: 4,
        url: "/common-phrases-20",
        name: "Ways to Say GOOD NIGHT"
    },
    {
        id: 1021,
        courseId: 4,
        url: "/common-phrases-21",
        name: "Ways to Say I LOVE YOU"
    },
    {
        id: 1022,
        courseId: 4,
        url: "/common-phrases-22",
        name: "Ways to Say I DON’T KNOW"
    },
    {
        id: 1023,
        courseId: 4,
        url: "/common-phrases-23",
        name: "English Phrases – How to Accept Apologies"
    },
    {
        id: 1024,
        courseId: 4,
        url: "/common-phrases-24",
        name: "English Phrases – How to Ask Someone to Repeat Something"
    },
    {
        id: 1025,
        courseId: 4,
        url: "/common-phrases-25",
        name: "Ways to Say I’M HUNGRY"
    },
    {
        id: 1026,
        courseId: 4,
        url: "/common-phrases-26",
        name: "Ways to Say Good Morning"
    },
    {
        id: 1027,
        courseId: 4,
        url: "/common-phrases-27",
        name: "Making Apologies"
    },
    {
        id: 1028,
        courseId: 4,
        url: "/common-phrases-28",
        name: "Accepting Apologies"
    },
    {
        id: 1029,
        courseId: 4,
        url: "/common-phrases-29",
        name: "Creative Ways to Say NO"
    },
    {
        id: 1030,
        courseId: 4,
        url: "/common-phrases-30",
        name: "Ways to Say GOODBYE"
    },
    {
        id: 1031,
        courseId: 4,
        url: "/common-phrases-31",
        name: "Ways To Say YES"
    },
    {
        id: 1032,
        courseId: 4,
        url: "/common-phrases-32",
        name: "Ways to Say HAPPY BIRTHDAY"
    },
    {
        id: 1033,
        courseId: 4,
        url: "/common-phrases-33",
        name: "Ways to Say HOW ARE YOU?"
    },
    {
        id: 1034,
        courseId: 4,
        url: "/common-phrases-34",
        name: "Ways to Say I DON’T LIKE IT"
    },
    {
        id: 1035,
        courseId: 4,
        url: "/common-phrases-35",
        name: "Ways to Say OH MY GOD!"
    },
    {
        id: 1036,
        courseId: 4,
        url: "/common-phrases-36",
        name: "Ways to Say I’M TIRED"
    },
];


export {courseUnits as default};
