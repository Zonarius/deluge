declare namespace createDeluge {
  export interface DelugeAPI {
    /**
     * Adds a torrent by providing a magnet link. If successful, it will add and start downloading without further action.
     * @param magnet The magnet link
     * @param dlPath Path on the server to download the file to
     */
    add(magnet: string, dlPath: string): Promise<boolean>;
    /**
     * Adds a torrent by providing a file path on the server. If successful, it will add and start downloading without further action.
     * @param magnet The file path on the server
     * @param dlPath Path on the server to download the file to
     */
    add(file: string, dlPath: string): Promise<boolean>;
    /**
     * Adds a torrent by providing an URL to a torrent file. Deluge will download the file and start the download. If successful, it will add and start downloading without further action.
     * @param magnet The URL to the torrent file
     * @param dlPath Path on the server to download the file to
     */
    add(url: string, dlPath: string): Promise<boolean>;
    /**
     * Return the list of all the deluge daemon registered in the WebUI
     */
    getHosts(): Promise<Host[]>;
    /**
     * Tell the WebUI to connect to the wanted host. The result of the callback will be either TRUE if connected or FALSE if not connected.
     */
    connect(hostID: string): Promise<boolean>;
    /**
     * Check if the WebUI is connected to a deamon.
     */
    isConnected(): Promise<boolean>;
    /**
     * Set cookies in COOKIE_JAR, cookies is an object with urls as keys, example:
     * {'http://example.org/': 'uid=1234;pass=xxxx;'}
     */
    setCookies(cookies: Cookies): Promise<boolean>;
    /**
     * Get the list of all torrents and changing data that represents their status in the WebUI
     */
    getTorrentRecord(): Promise<TorrentRecords>;
  }

  export interface Cookies {
    [url: string]: string;
  }

  /**
   * @example
   * [
   *   {
   *     "id": "c5375fe2220b2133cccacb92afdebf9214125b36",
   *     "ip": "127.0.0.1",
   *     "port": 58846,
   *     "status": "Offline"
   *   }
   * ]
   *
   */
  export interface Host {
    id: string;
    ip: string;
    port: number;
    status: 'Offline' | 'Online' | 'Connected';
  }

  interface TorrentRecords {
    stats: Stats;
    connected: boolean;
    torrents: {
      [uuid: string]: Torrent;
    };
    filters: Filters;
  }

  type Filter = 'All' | 'Downloading' | 'Seeding' | 'Active' | 'PausedQueued' | 'Checking' | 'Error';

  interface Filters {
    state: Array<[Filter, number]>;
    'tracker_host': Array<[string, number]>;
  }

  interface Torrent {
    'max_download_speed': number;
    'upload_payload_rate': number;
    'download_payload_rate': number;
    'num_peers': number;
    ratio: number;
    'total_peers': number;
    'max_upload_speed': number;
    state: string;
    'distributed_copies': number;
    'save_path': string;
    progress: number;
    'time_added': number;
    'tracker_host': string;
    'total_uploaded': number;
    'total_done': number;
    'total_wanted': number;
    'total_seeds': number;
    'seeds_peers_ratio': number;
    'num_seeds': number;
    name: string;
    'is_auto_managed': boolean;
    queue: number;
    eta: number;
  }

  interface Stats {
    'upload_protocol_rate': number;
    'max_upload': number;
    'download_protocol_rate': number;
    'download_rate': number;
    'has_incoming_connections': boolean;
    'num_connections': number;
    'max_download': number;
    'upload_rate': number;
    'dht_nodes': number;
    'free_space': number;
    'max_num_connections': number;
  }
}

/**
 * @param deluge_url The address of your deluge-web server with "json" appended. ex http://192.168.0.100:8112/json
 * @param password The password of your deluge-web server - default "deluge".
 */
declare function createDeluge(deluge_url: string, password: string): createDeluge.DelugeAPI

export = createDeluge;
