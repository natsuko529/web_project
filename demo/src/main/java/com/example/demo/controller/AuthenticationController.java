package com.example.demo.controller;


import java.util.Map;

import com.example.demo.security.AuthenticationRequest;
import com.example.demo.security.AuthenticationResponse;
import com.example.demo.security.JwtUtil;
import com.example.demo.security.TokenRequest;
import com.example.demo.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class AuthenticationController {
    private AuthenticationManager authenticationManager;
    private UserService userService;
    private JwtUtil jwtTokenUtil;


    @Autowired
    public void setAuthenticationManager(AuthenticationManager authenticationManager,
                                         UserService userDetailsService, JwtUtil jwtTokenUtil) {
        this.authenticationManager = authenticationManager;
        this.userService = userDetailsService;
        this.jwtTokenUtil = jwtTokenUtil;

    }

    @CrossOrigin
    @RequestMapping(value = "/refresh", method = {RequestMethod.POST})
    public ResponseEntity<?> refreshTokens(@RequestBody TokenRequest tokenRequest) throws Exception {
        final String refreshToken = tokenRequest.getRefreshToken();
        final String username = jwtTokenUtil.extractUsername(refreshToken);
        final UserDetails userDetails = userService.loadUserByUsername(username);

        if (refreshToken.equals(userService.getToken(username)) && jwtTokenUtil.validateToken(refreshToken,
                userDetails, "REFRESH")) {
            final Map<String, String> tokens = jwtTokenUtil.generateTokens(userDetails);
            userService.updateToken(tokens.get("refreshToken"), username);
            AuthenticationResponse response = new AuthenticationResponse(tokens.get("accessToken"),
                    tokens.get("refreshToken"), userDetails.getAuthorities().toString(),
                    jwtTokenUtil.extractExpiration(tokens.get("accessToken")).getTime());
            return ResponseEntity.status(HttpStatus.OK).body(response);
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Refresh token is invalid");

    }

    @CrossOrigin
    @RequestMapping(value = "/authenticate", method = {RequestMethod.POST})
    public ResponseEntity<AuthenticationResponse> createAuthenticationTokens(
            @RequestBody AuthenticationRequest authenticationRequest)
            throws Exception {
        try {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
                    authenticationRequest.getEmail(), authenticationRequest.getPassword()));
        } catch (Exception e) {
            throw new Exception("Incorrect username or password", e);
        }

        final UserDetails userDetails = userService.loadUserByUsername(authenticationRequest.getEmail());
        final Map<String, String> tokens = jwtTokenUtil.generateTokens(userDetails);
        // list
        userService.updateToken(tokens.get("refreshToken"), authenticationRequest.getEmail());
        final AuthenticationResponse response = new AuthenticationResponse(tokens.get("accessToken"),
                tokens.get("refreshToken"), userDetails.getAuthorities().toString(),
                jwtTokenUtil.extractExpiration(tokens.get("accessToken")).getTime());

        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

}