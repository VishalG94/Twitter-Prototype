var User = require("../../api/models/user");
var List = require("../../api/models/list");

function handle_request(msg, callback) {
   
    console.log(" Kafka backend inside createlists");
    var email = msg.email
    var members = JSON.parse(msg.members)
    var members_id = []
    
    console.log(msg) 
    
    members.forEach(member => {

        User.findOne({username:member}).then((user) => {
            console.log(user._id)
            members_id.push(user._id) 
            
        })
    });

    User.findOne({ email: email }).then((doc) => {           

        const list = new List({
            name: msg.name,
            description : msg.description,
            owner : doc._id,
            members : members_id  
            
          });

          console.log("List created")

          list.save()
              .then(result => {
                  console.log(result);
                  callback(null,"Success")
              }).catch(error => {
                  console.log(error)
                  callback(null,"error")
              })      

    }).catch((err) => {
        console.log("get Createlists Error! " + err)
       callback(null,"get createlists failed")
    })
}

exports.handle_request = handle_request;
