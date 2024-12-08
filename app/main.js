import net from "net";

// You can use print statements as follows for debugging, they'll be visible when running tests.
console.log("Logs from your program will appear here!");

// Uncomment this block to pass the first stage
const server = net.createServer((connection) => {

    connection.on("data", (data) => {
        connection.write(Buffer.alloc(4)); //Message size
        connection.write(Buffer.copyBytesFrom(data, 8, 4)); //Correlation Id
        const apiVersion = Buffer.copyBytesFrom(data, 6, 2).toString();
        const responseCode = Buffer.alloc(2);
        if (apiVersion != '4') {
            responseCode.writeInt16BE(35);
        }
        connection.write(responseCode);

        connection.end();
    })

    //Read buffer with an offset of 32 bits (messagesize) + 16 bits (api key) + 16 bits (api version) to get correlation_id 
});
//
server.listen(9092, "127.0.0.1");

