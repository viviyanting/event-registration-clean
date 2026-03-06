export type Event = {
    id:string;
    title:string;
    description:string;
    isRegistered:boolean;
};

export const events : Event[] = [
    {
        id:"1",
        title:"前端讀書會",
        description:"一起學React與前端基礎",
        isRegistered:false,
    },
    {
        id:"2",
        title:"Node.js 工作坊",
        description:"用Node.js建立後端API",
        isRegistered:false,
    },
];