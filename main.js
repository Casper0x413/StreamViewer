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

class Livestream {
  constructor( platform , tag ) {
    platform = String( platform ).toLowerCase();

    this.platform = platform in platforms ? platform : "";
    this.tag = String( tag );

    if ( !this.platform ) throw new Error( "Livestream() requires a supported platform" );
    if ( !this.tag ) throw new Error( "Livestream() requires a non empty tag" );

    this.routes = {
      "chat" : platforms[ this.platform ].chat.replace( "{tag}", this.tag ),
      "video" : platforms[ this.platform ].video.replace( "{tag}", this.tag )
    };

    return this.#embed();
  }

  #embed() {
    const div = document.createElement( "div" );

    const chat = document.createElement( "iframe" );
    chat.src = this.routes.chat;
    chat.height = "480px";
    chat.width = "720px";

    const video = document.createElement( "iframe" );
    video.src = this.routes.video;
    video.height = "480px";
    video.width = "720px";

    div.appendChild( video );
    div.appendChild( chat );

    return div;
  }
}

const route = new URL( location );

for ( const [ platform , streams ] of route.searchParams.entries() ) {
  const stream = streams.split( " " );

  stream.forEach( tag => {
    document.body.appendChild( new Livestream( platform , tag ) );
  } );
}