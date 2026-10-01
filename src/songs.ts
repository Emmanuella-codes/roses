export interface Song {
    title: string;
    artist: string;
    note: string;   // the one-line "why I picked it"
    file: string;   
    start: number; // snippet start, in seconds
    tone?: "red" | "white";
}

export const SNIPPET_SECONDS = 12;

export const notes: string[] = [
    "I get so happy when i see notifications from you. 🫣",
    "Here's hoping i get to make you smile today.",
    "Looking forward to the dance we owe each other.",
    "You bring out the creative sides of me.",
    "Keep going, there is a song hiding in here.",
];

export const finale: Song = {
    title: "Addiction",
    artist: "Rema",
    note: "All of a sudden this song is linked to one of my favorite memories with you.",
    file: "Rema_Addicted.mp3",
    start: 25,
  };

export const songs: Song[] = [
    { title: "Yellow", artist: "Coldplay", note: "Because you make ordinary days feel golden.", file: "yellow.mp3", start: 30, tone: "red" },
    { title: "Best Part", artist: "Daniel Caesar & H.E.R.", note: "You are my favorite part of every day.", file: "best-part.mp3", start: 20, tone: "white" },
    { title: "Golden Hour", artist: "JVKE", note: "This is how our first evening felt.", file: "golden-hour.mp3", start: 45, tone: "red" },
    { title: "Lover", artist: "Taylor Swift", note: "The song I hum when you are in the kitchen.", file: "lover.mp3", start: 40, tone: "white" },
    { title: "Adore You", artist: "Harry Styles", note: "It says what I could not say out loud.", file: "adore-you.mp3", start: 50, tone: "red" },
    { title: "Calm Down", artist: "Rema", note: "Every Lagos wedding, and you laughing.", file: "calm-down.mp3", start: 25, tone: "white" },
    { title: "Perfect", artist: "Ed Sheeran", note: "The slow dance we still owe each other.", file: "perfect.mp3", start: 60, tone: "red" },
    { title: "Essence", artist: "Wizkid ft. Tems", note: "Playing on the drive where I fell for you.", file: "essence.mp3", start: 35, tone: "white" },
    { title: "Sunday Best", artist: "Surfaces", note: "Lazy Sundays are better with you.", file: "sunday-best.mp3", start: 15, tone: "red" },
    { title: "Better Together", artist: "Jack Johnson", note: "Proof that I am a sucker for acoustic guitar.", file: "better-together.mp3", start: 10, tone: "white" },
    { title: "Count on Me", artist: "Bruno Mars", note: "A promise in three minutes.", file: "count-on-me.mp3", start: 30, tone: "red" },
    { title: "Sunday Kind of Love", artist: "Etta James", note: "The oldest song that sounds like you.", file: "sunday-kind-of-love.mp3", start: 20, tone: "white" },
    { title: "Until I Found You", artist: "Stephen Sanchez", note: "I was waiting the whole time.", file: "until-i-found-you.mp3", start: 40, tone: "red" },
    { title: "At Last", artist: "Etta James", note: "Some beautiful things are worth waiting for.", file: "at-last.mp3", start: 25, tone: "white" },
    { title: "Your Song", artist: "Elton John", note: "A little song for the person who makes life brighter.", file: "your-song.mp3", start: 35, tone: "red" },
    { title: "All of Me", artist: "John Legend", note: "For every version of you that I love.", file: "all-of-me.mp3", start: 45, tone: "white" },
    { title: "Just the Way You Are", artist: "Bruno Mars", note: "You never needed to be anything else.", file: "just-the-way-you-are.mp3", start: 30, tone: "red" },
    { title: "What a Wonderful World", artist: "Louis Armstrong", note: "You make the world feel a little more wonderful.", file: "what-a-wonderful-world.mp3", start: 20, tone: "white" },
    { title: "The Way You Look Tonight", artist: "Frank Sinatra", note: "A reminder that you make every moment feel special.", file: "the-way-you-look-tonight.mp3", start: 30, tone: "red" },
    { title: "Kiss Me", artist: "Sixpence None the Richer", note: "For the soft, happy moments we keep finding.", file: "kiss-me.mp3", start: 25, tone: "white" },
    { title: "Come Away with Me", artist: "Norah Jones", note: "Anywhere feels right when I am with you.", file: "come-away-with-me.mp3", start: 20, tone: "red" },
    { title: "You Are the Best Thing", artist: "Ray LaMontagne", note: "You really are the best part of my story.", file: "you-are-the-best-thing.mp3", start: 35, tone: "white" },
    { title: "How Deep Is Your Love", artist: "Bee Gees", note: "A question with an answer I already know.", file: "how-deep-is-your-love.mp3", start: 25, tone: "red" },
    { title: "This Will Be (An Everlasting Love)", artist: "Natalie Cole", note: "For the joy you bring into ordinary days.", file: "this-will-be.mp3", start: 30, tone: "white" },
    { title: "Dream a Little Dream of Me", artist: "Ella Fitzgerald", note: "For the quiet moments when I am thinking of you.", file: "dream-a-little-dream-of-me.mp3", start: 20, tone: "red" },
    { title: "My Girl", artist: "The Temptations", note: "Because you bring sunshine wherever you go.", file: "my-girl.mp3", start: 25, tone: "white" },
    { title: "Stand by Me", artist: "Ben E. King", note: "I will always be in your corner.", file: "stand-by-me.mp3", start: 30, tone: "red" },
    { title: "Beyond", artist: "Leon Bridges", note: "For the feeling that this could be something lasting.", file: "beyond.mp3", start: 35, tone: "white" },
    { title: "I Choose You", artist: "Sara Bareilles", note: "The easiest choice I have ever made.", file: "i-choose-you.mp3", start: 25, tone: "red" },
    { title: "Lovely Day", artist: "Bill Withers", note: "You make even an ordinary day lovely.", file: "lovely-day.mp3", start: 20, tone: "white" },
];
