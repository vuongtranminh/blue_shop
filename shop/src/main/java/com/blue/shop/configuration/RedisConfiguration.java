package com.blue.shop.configuration;

import java.util.Objects;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;
import org.springframework.core.env.Environment;
import org.springframework.data.redis.connection.RedisStandaloneConfiguration;
import org.springframework.data.redis.connection.jedis.JedisConnectionFactory;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.repository.configuration.EnableRedisRepositories;
import org.springframework.data.redis.serializer.JdkSerializationRedisSerializer;
import org.springframework.data.redis.serializer.StringRedisSerializer;

@Configuration
@EnableRedisRepositories
public class RedisConfiguration {
	
	private final Environment env;

    public RedisConfiguration(Environment env) {
        this.env = env;
    }

	@Bean
	public JedisConnectionFactory connectionFactory() {
		RedisStandaloneConfiguration configuration = new RedisStandaloneConfiguration();
		configuration.setHostName(Objects.requireNonNull(env.getProperty("spring.redis.host")));
		configuration.setPort(Integer.parseInt(Objects.requireNonNull(env.getProperty("spring.redis.port"))));
		return new JedisConnectionFactory(configuration);
	}
	
	@Bean
	@Primary
	public RedisTemplate<String, Object> redisTemplate() {
	    RedisTemplate<String, Object> template = new RedisTemplate<>();
	    template.setConnectionFactory(connectionFactory());
	    template.setKeySerializer(new StringRedisSerializer());
	    template.setHashKeySerializer(new StringRedisSerializer());
	    template.setHashKeySerializer(new JdkSerializationRedisSerializer());
	    template.setValueSerializer(new JdkSerializationRedisSerializer());
	    template.setEnableTransactionSupport(true);
	    template.afterPropertiesSet();
	    return template;
	}
}
