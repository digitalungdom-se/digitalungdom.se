const express = require( 'express' );
const router = express.Router();
const validator = require( 'validator' );
const validateObjectID = require( 'mongodb' ).ObjectID.IsValid;

const ensureUserAuthenticated = require( './../../../helpers/ensureUserAuthentication' ).ensureUserAuthenticated;
const ensureNotUserAuthenticated = require( './../../../helpers/ensureUserAuthentication' ).ensureNotUserAuthenticated;

const getUserByEmail = require( './../../../models/get' ).getUserByEmail;
const getUserByUsername = require( './../../../models/get' ).getUserByUsername;
const getUserById = require( './../../../models/get' ).getUserById;
const checkGroup = require( './../../../models/get' ).checkGroup;
const checkBadges = require( './../../../models/get' ).checkBadges;

const agorize = require( './../../../models/user/agora' ).agorize;

router.post( '/agorize', ensureUserAuthenticated, async function( req, res ) {
      // Fetches all the fields and their values
      const id = req.user;
      const body = req.body.body;
      const type = req.body.type;
      const group = req.body.group;
      // Is not required
      const badges = req.body.badges;

      // Post specific
      const title = req.body.title;
      const tags = req.body.tags;

      // Comment specific
      const replyTo = req.body.replyTo;

      // Checks that they all are strings, validatorjs only allows string (prevent errors)
      if ( typeof body !== 'string' || typeof type !== 'string' || typeof author !== 'string' ) return res.status( 400 ).send( { 'type': 'fail', 'reason': 'Only strings are accepted' } );
      if ( !validator.isIn( type, [ 'post', 'comment', 'link', 'question' ] ) ) return res.status( 400 ).send( { 'type': 'fail', 'reason': 'You can only post a (post|comment|link|question)', type } );
      if ( !validator.isLength( body, { min: 0, max: 10000 } ) ) return res.status( 400 ).send( { 'type': 'fail', 'reason': 'Body is too long', body } );
      let postAs;
      let postBadges;

      if ( group !== 'user' ) {
        if ( !validateObjectID( replyTo ) ) return res.status( 400 ).send( { 'type': 'fail', 'reason': 'group is not an objectID', group } );
        if ( !( await checkGroup( id, group ) ) ) return res.status( 400 ).send( { 'type': 'fail', 'reason': 'You are not authorised to use that role', group } );
      } else {
        for ( let badge of badges ) {
          if ( !validateObjectID( badge ) ) return res.status( 400 ).send( { 'type': 'fail', 'reason': 'badge is not an objectID', badge } );
        }
        if ( !( await checkBadges( id, badges ) ) ) return res.status( 400 ).send( { 'type': 'fail', 'reason': 'You are not authorised to use those badges', badges } );
      }

      // Specific validation
      if ( type === 'post' ) {
        // Validates the length of the post
        if ( typeof title != 'string' ) return res.status( 400 ).send( { 'type': 'fail', 'reason': 'Only strings are accepted', title } );
        if ( !validator.isLength( title, { min: 10, max: 100 } ) ) return res.status( 400 ).send( { 'type': 'fail', 'Title is too long', title } );
        if ( !Array.isArray( tags ) ) return res.status( 400 ).send( { 'type': 'fail', 'reason': 'Tags has to be an array', tags } );
        if ( tags.length > 10 ) return res.status( 400 ).send( { 'type': 'fail', 'reason': 'Too many tags, max 10', tags: tags } );
        for ( tag of tags ) {
          if ( !typeof tag !== 'string' ) return res.status( 400 ).send( { 'type': 'fail', 'reason': 'Only strings allowed for tags', tag: tag } );
          if ( !validator.isLength( title, { min: 3, max: 32 } ) return res.status( 400 ).send( { 'type': 'fail', 'reason': 'Tag is too long', tag: tag } );
          }

        } else if ( type === 'comment' ) {
          // Validates the length of the post
          if ( !validateObjectID( replyTo ) ) return res.status( 400 ).send( { 'type': 'fail', 'reason': 'replyTo is not an objectID', replyTo } );
        } else {
          if ( !validator.isURL( body, { protocols: [ 'http', 'https' ] } ) ) return res.status( 400 ).send( { 'type': 'fail', 'reason': 'Link posts may only be links', body } );
        }

        await agorize( id, { title, body, type, group, badges, tags, replyTo } );
      } );

    module.exports = router;