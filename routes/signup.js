const express = require( 'express' );
const router = express.Router();
const rateLimit = require( 'express-rate-limit' );

const ensureUserAuthenticated = require( './../helpers/ensureUserAuthentication' ).ensureUserAuthenticated;
const ensureNotUserAuthenticated = require( './../helpers/ensureUserAuthentication' ).ensureNotUserAuthenticated;

const createAccountLimiter = rateLimit( {
  windowMs: 60 * 60 * 1000, // 1 hour window
  max: 2, // start blocking after 5 requests
  handler: function( req, res ) {
    return res.status( 429 ).render( 'error.ejs', {
      errorcode: "429",
      message: "För många konton skapade på denna IP adress, var vänlig att försök igen om en timma."
    } );
  }
} );

router.post( '/signup', ensureNotUserAuthenticated, createAccountLimiter, async function( req, res ) {
  try {
    const email = req.body.email;
    const password = req.body.password;
    const firstname = req.body.firstname;
    const surname = req.body.surname;
    const birthday = req.body.birthday;
    const gender = req.body.gender;
    const finnish = req.body.finnish;

    req.checkBody( 'email', 'E-post krävs' ).notEmpty();
    req.checkBody( 'email', 'E-posten är inte giltig' ).isEmail();
    req.checkBody( 'email', 'Ditt email kan inte vara så långt' ).isLength( {
      min: 0,
      max: 150
    } );

    req.checkBody( 'password', 'Lösenord krävs' ).notEmpty();
    req.checkBody( 'password', 'Ditt lösenord får inte vara så långt' ).isByteLength( [ {
      min: 0,
      max: 72
    } ] );

    req.checkBody( 'firstname', 'Förnamn krävs' ).notEmpty();
    req.checkBody( 'firstname', 'Ditt förnamn kan inte vara så långt' ).isLength( {
      min: 0,
      max: 36
    } );
    req.checkBody( 'firstname', 'Förnamn måste innehålla bara bokstäver' ).isWhitelisted( 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyzÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖØÙÚÛÜÝÞàáâãäåæçèéêëìíîïðñòóôõöøùúûüýþÿ ' );

    req.checkBody( 'surname', 'Efternamn krävs' ).notEmpty();
    req.checkBody( 'surname', 'Ditt efternamn kan inte vara så långt' ).isLength( {
      min: 0,
      max: 36
    } );
    req.checkBody( 'surname', 'Efternamn måste innehålla bara bokstäver' ).isWhitelisted( 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyzÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖØÙÚÛÜÝÞàáâãäåæçèéêëìíîïðñòóôõöøùúûüýþÿ ' );

    req.checkBody( 'birthday', 'Måste vara ett giltigt datum' ).isISO8601();

    req.checkBody( 'gender', '???' ).isIn( [ 'male', 'female', 'other', 'undefined' ] );

    req.checkBody( 'finnish', '???' ).isBoolean();

    let errors = req.validationErrors();

    const user = await getUserByEmail( db, email )
    if ( user ) {
      if ( !errors ) {
        errors = [];
      }
      errors.push( {
        param: 'email',
        msg: 'Det finns redan ett konto kopplat till den E-posten',
        value: email
      } );
    }

    if ( errors ) {
      return res.render( 'signup', {
        errors: errors
      } );

    } else {
      const date = birthday.split( '-' );
      const user = {
        "email": email,
        "password": password,
        "firstname": firstname.charAt( 0 ).toUpperCase() + firstname.slice( 1 ),
        "surname": surname.charAt( 0 ).toUpperCase() + surname.slice( 1 ),
        "birthday": new Date( Date.UTC( date[ 0 ], date[ 1 ] - 1, date[ 2 ] ) ),
        "gender": gender,
        "finnish": ( finnish == "true" ),
        "files": {
          "cv": false,
          "coverLetter": false,
          "essay": false,
          "grades": false,
        },
        "survey": {},
        "recommendationLetter": [ {
            "token": null,
            "email": null,
            "resend": null,
            "received": false,
          },
          {
            "token": null,
            "email": null,
            "resend": null,
            "received": false,
          },
          {
            "token": null,
            "email": null,
            "resend": null,
            "received": false,
          },
        ],
        "resetPasswordToken": null,
        "resetPasswordExpires": null,
        "verified": false,
        "verificationToken": null,
      }

      req.flash( 'success', `Ett konto är nu skapad men du måste verfiera ditt email (${email}) innan du kan logga in!` );
      res.redirect( '/login' );

      await createUser( db, user );
      return sendVerification( db, email );
    }
  } catch ( e ) {
    res.status( 500 ).render( 'error.ejs', {
      errorcode: "500",
      message: "Intern server error, detta var inte bra. Var snäll att kontakta oss och ange hur du fick denna error"
    } );

    console.error( e );
  }
} );

module.exports = router;