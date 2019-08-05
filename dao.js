const db = require('./db');
//const UserType = require('./UserType');

module.exports.viewBill = (req, res) => {
    const { idUser } = req.body;
    db.query(`SELECT billAmount FROM User WHERE idUser = '${idUser}';`, (err, result) => {
      if (result[0]) {
          if (err) {
              return res.json({
                  success: false,
                  msg: err.message
              });
          }
          const jsonResult = Object.assign({}, result[0]);
          console.log(jsonResult);
          if (result.length > 0) {
              return res.json({
                  success: true,
                  info: jsonResult
              });
          } else {
              return res.json({
                  success: false
              });
          }
      } else {
        return res.json({
          success: false,
          msg: 'This user does not exist'
        })
      }
    });
};

module.exports.payBill = (req, res) => {
  const { idUser } = req.body;
  db.query(`UPDATE User SET billAmount = 0 WHERE idUser = '${idUser}';`, (err) => {
      if (err) {
          return res.json({
              success: false,
              msg: err.message
          });
      } else {
        return res.json({
          success: true
        })
      }
  });
}

module.exports.viewUsage = (req, res) => {
    const { idUser } = req.body;
    db.query(`SELECT usageAmount FROM User WHERE idUser = '${idUser}';`, (err, result) => {
          if (err) {
              return res.json({
                  success: false,
                  msg: err.message
              });
          }
          const jsonResult = Object.assign({}, result[0]);
          console.log(jsonResult);
          if (result.length > 0) {
              return res.json({
                  success: true,
                  info: jsonResult
              });
          } else {
              return res.json({
                  success: false
              });
          }
    });
};

module.exports.viewUserInfo = (req, res) => {
    const { idUser } = req.body;
    db.query(`SELECT * FROM User WHERE idUser = '${idUser}';`, (err, result) => {
          if (err) {
              return res.json({
                  success: false,
                  msg: err.message
              });
          }
          const jsonResult = Object.assign({}, result[0]);
          console.log(jsonResult);
          if (result.length > 0) {
              return res.json({
                  success: true,
                  info: jsonResult
              });
          } else {
              return res.json({
                  success: false
              });
          }
    });
};

module.exports.registerUser = (req, res) => {
    const { idUser, billAmount, subStatus, usageAmount, parentalControls, viewingPrefs, interests, isOutage } = req.body;
    const query = db.query(`INSERT INTO User (idUser, billAmount, subStatus, usageAmount, parentalControls, viewingPrefs,
      interests, isOutage) VALUES ('${idUser}', '${billAmount}', '${subStatus}', '${usageAmount}',
      '${parentalControls}', '${viewingPrefs}', '${interests}', '${isOutage}');`, err => {
        if (err) {
            return res.json({
                success: false,
                msg: err.message
            });
        } else {
          return res.json({
            success: true
          })
        }
    });
};

module.exports.deleteUser = (req, res) => {
  const { idUser } = req.body;
  const query = db.query(`DELETE FROM User WHERE idUser = '${idUser}'`, (err) => {
      if (err) {
          return res.json({
              success: false,
              msg: err.message
          });
      } else {
        return res.json({
          success: true
        })
      }
  });
}

module.exports.viewAllUsers = (req, res) => {
  const query = db.query(`SELECT * FROM User`, (err, result) => {
    if (err) {
        return res.json({
            success: false,
            msg: err.message
        });
    } else {
      const jsonResult = Object.assign({}, result);
      console.log(jsonResult);
      if (result.length > 0) {
          return res.json({
              success: true,
              info: jsonResult
          });
        } else {
          return res.json({
            success: false
          });
        }
    }
  })
}

module.exports.upgrade = (req, res) => {
  const { idUser } = req.body;
  db.query(`SELECT subStatus FROM User WHERE idUser = '${idUser}';`, (err, result) => {
      if (err) {
        return res.json({
          success: false,
          msg: err.message
        });
      } else {
        if (result[0].subStatus === 'paid user') {
          return res.json({
            success: true,
            msg: 'duplicate'
          });
        } else {
          db.query(`UPDATE User SET subStatus = 'paid user' WHERE idUser = '${idUser}';`, (err) => {
            if (err) {
                return res.json({
                    success: false,
                    msg: err.message
                });
            } else {
              return res.json({
                success: true
              })
            }
          });
        }
      }
  })
}

module.exports.downgrade = (req, res) => {
  const { idUser } = req.body;
  db.query(`SELECT subStatus FROM User WHERE idUser = '${idUser}';`, (err, result) => {
      if (err) {
        return res.json({
          success: false,
          msg: err.message
        });
      } else {
        if (result[0].subStatus === 'free user') {
          return res.json({
            success: true,
            msg: 'duplicate'
          });
        } else {
          db.query(`UPDATE User SET subStatus = 'free user' WHERE idUser = '${idUser}';`, (err) => {
            if (err) {
                return res.json({
                    success: false,
                    msg: err.message
                });
            } else {
              return res.json({
                success: true
              })
            }
          });
        }
      }
  })
}

module.exports.toggleParentalControls = (req, res) => {
  const { idUser } = req.body;
  db.query(`
	UPDATE User SET parentalControls = !parentalControls WHERE idUser = '${idUser}';
	SELECT parentalControls FROM User WHERE idUser = '${idUser}';`,
	(err, result) => {
      if (err) {
  	     return res.json({
  		       success: false,
  		       msg: err.message
  	     });
      }
      if (result.length > 0) {
  	     return res.json({
  	        success: true,
  	        info: result[1][0]
  	       });
      } else {
          return res.json({
  	         success: false
  	        });
      }
  });
}

module.exports.setViewingPrefs = (req, res) => {
  const { idUser, viewingPrefs } = req.body;
  db.query(`UPDATE User SET viewingPrefs = '${viewingPrefs}' WHERE idUser = '${idUser}';`, (err) => {
      if (err) {
          return res.json({
              success: false,
              msg: err.message
          });
      } else {
        return res.json({
          success: true
        })
      }
  });
}

module.exports.setInterests = (req, res) => {
  const { idUser, interests } = req.body;
  db.query(`UPDATE User SET interests = '${interests}' WHERE idUser = '${idUser}';`, (err) => {
      if (err) {
          return res.json({
              success: false,
              msg: err.message
          });
      } else {
        return res.json({
          success: true
        })
      }
  });
}

module.exports.viewPrefs = (req, res) => {
    const { idUser } = req.body;
    db.query(`SELECT viewingPrefs FROM User WHERE idUser = '${idUser}';`, (err, result) => {
        if (err) {
            return res.json({
                success: false,
                msg: err.message
            });
        }
        const jsonResult = Object.assign({}, result[0]);
        console.log(jsonResult);
        if (result.length > 0) {
            return res.json({
                success: true,
                info: jsonResult
            });
        } else {
            return res.json({
                success: false
            })
        }
    });
}

module.exports.viewInterests = (req, res) => {
    const { idUser } = req.body;
    db.query(`SELECT interests FROM User WHERE idUser = '${idUser}';`, (err, result) => {
        if (err) {
            return res.json({
                success: false,
                msg: err.message
            });
        }
        const jsonResult = Object.assign({}, result[0]);
        console.log(jsonResult);
        if (result.length > 0) {
            return res.json({
                success: true,
                info: jsonResult
            });
        } else {
            return res.json({
                success: false
            })
        }
    });
}

module.exports.viewOutage = (req, res) => {
    const { idUser } = req.body;
    db.query(`SELECT isOutage FROM User WHERE idUser = '${idUser}';`, (err, result) => {
          if (err) {
              return res.json({
                  success: false,
                  msg: err.message
              });
          }
          const jsonResult = Object.assign({}, result[0]);
          console.log(jsonResult);
          if (result.length > 0) {
              return res.json({
                  success: true,
                  info: jsonResult
              });
          } else {
              return res.json({
                  success: false
              });
          }
    });
};
