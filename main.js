const platforms = {
  "kick.com" : {
    "chat" : "https://kick.com/{tag}/chatroom",
    "video" : "https://player.kick.com/{tag}"
  },
  "twitch.tv" : {
    "chat" : "https://www.twitch.tv/embed/{tag}/chat?parent=casper0x413.github.io",
    "video" : "https://player.twitch.tv/?channel={tag}&parent=casper0x413.github.io"
  },
  "youtube.com" : {
    "chat" : "https://www.youtube.com/live_chat?v={tag}",
    "video" : "https://www.youtube.com/embed/{tag}?autoplay=1"
  }
};

const route = new URL( location );

for ( const [ platform , streams ] of route.searchParams.entries() ) {
  if ( !platforms?.[ platform.toLowerCase() ] ) continue;

  const stream = streams.split( " " );

  stream.forEach( tag => {
    const div = document.createElement( "div" );

    const chatRoute = platforms[ platform ].chat.replace( "{tag}" , tag );
    const videoRoute = platforms[ platform ].video.replace( "{tag}" , tag );

    const chat = document.createElement( "iframe" );
    chat.id = "chat";
    chat.src = chatRoute;
    chat.height = "480px";
    chat.width = "720px";

    const video = document.createElement( "iframe" );
    video.id = "video";
    video.src = videoRoute;
    video.height = "480px";
    video.width = "720px";

    div.appendChild( video );
    div.appendChild( chat );

    document.body.appendChild( div );
  } );
}